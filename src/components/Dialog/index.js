import { ConfigProvider, Modal } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import classnames from "classnames";
import React from "react";
import ReactDOM from "react-dom";

const IS_REACT_16 = !!ReactDOM.createPortal;

export const createXDialog = (options) => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    let currentConfig = {
        ...options,
        children: options.children && options.children({ close }),
        visible: true
    };

    function close() {
        currentConfig = {
            ...currentConfig,
            visible: false,
            afterClose: destroy.bind(this)
        };
        if (IS_REACT_16) {
            render(currentConfig);
        } else {
            destroy();
        }
    }

    function destroy() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }


    function render(props) {
        ReactDOM.render(
            <ConfigProvider locale={zhCN}>
                <Modal
                    {...props}
                    className={classnames("x-dialog", props.className)}
                    onCancel={close}
                    centered
                    getContainer={false}
                    footer={null}
                    maskClosable={false}
                />
            </ConfigProvider>,
            div
        )
    }

    render(currentConfig);

    return {
        update: props => render({ ...currentConfig, ...props }),
        close
    }
}
