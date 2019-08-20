import classnames from "classnames";
import Notification from "rc-notification";
import React from "react";
import "./style";

let defaultDuration = 3;
let defaultTop = undefined;
let messageInstance = null;
let key = 1;
let transitionName = "fade-in";
let getContainer = () => document.body;
let maxCount = 1;
let className = undefined;
let maskable = false;
let mask = null;

function getMessageInstance(callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    Notification.newInstance(
        {
            prefixCls: "message",
            transitionName,
            style: { top: defaultTop },
            getContainer,
            maxCount
        },
        instance => {
            if (messageInstance) {
                callback(messageInstance);
                return;
            }
            messageInstance = instance;
            callback(instance);
        }
    );
}

function notice(args) {
    const duration = args.duration != undefined ? args.duration : defaultDuration;
    const target = key++;
    const closePromise = new Promise(resolve => {
        const callback = () => {
            if (mask) {
                document.body.removeChild(mask);
                mask = null;
            }

            if (typeof args.onClose === "function") args.onClose();
            return resolve(true);
        };
        getMessageInstance(instance => {
            if ((args.maskable || maskable) && !mask) {
                mask = document.createElement("div");
                mask.className = "message-mask";
                document.body.appendChild(mask);
            }
            instance.notice({
                key: target,
                duration,
                style: {},
                content: (
                    <div
                        style={args.style}
                        className={classnames(
                            "message-content",
                            "message-" + args.type,
                            args.className || className
                        )}
                    >
                        {args.content}
                    </div>
                ),
                onClose: callback
            });
        });
    });
    const result = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled, rejected) => closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
}

const api = {
    open: notice,
    config: options => {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null;
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
        if (options.transitionName !== undefined) {
            transitionName = options.transitionName;
            messageInstance = null;
        }
        if (options.maxCount !== undefined) {
            maxCount = options.maxCount;
            messageInstance = nulll;
        }
        if (options.className !== undefined) {
            className = options.className;
        }
        if (options.maskable !== undefined) {
            maskable = options.maskable;
        }
    },
    destroy: () => {
        if (messageInstance) messageInstance.destroy();
        messageInstance = null;
    }
};

let types = ["success", "info", "warning", "error", "loading"];
types.map(type => {
    api[type] = (content, duration, onClose) => {
        if (typeof content === "object") {
            return api.open({ ...content, type });
        }
        if (typeof duration === "function") {
            onClose = duration;
            duration = undefined;
        }
        return api.open({ content, duration, type, onClose });
    };
});

api.warn = api.warning;

export default api;
