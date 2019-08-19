import { Modal } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import entry from "utils/entry";

const IS_REACT_16 = !!ReactDOM.createPortal;

export default function confirm() {
    const div = document.createElement("div");
    document.body.appendChild(div);

    let currentConfig = { visible: true };

    function destroy() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    function render(props) {
        entry(
            <Modal
                centered
                bodyStyle={{ padding: 28 }}
                getContainer={false}
                footer={false}
                maskClosable={false}
                onCancel={close}
                {...props}
            />,
            div
        );
    }

    function close() {
        currentConfig = {
            visible: false,
            afterClose: destroy.bind(this)
        };
        if (IS_REACT_16) {
            render(currentConfig);
        } else {
            destroy();
        }
    }

    render(currentConfig);
}
