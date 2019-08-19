import { Modal } from "antd";

const centered = true;

export function info(content) {
    return new Promise(resolve => {
        Modal.info({
            title: "提示",
            content,
            centered,
            onOk: () => resolve()
        });
    });
}

export function success(content) {
    return new Promise(resolve => {
        Modal.success({
            title: "提示",
            content,
            centered,
            onOk: () => resolve()
        });
    });
}

export function error(content) {
    return new Promise(resolve => {
        Modal.error({
            title: "错误",
            content,
            centered,
            onOk: () => resolve()
        });
    });
}

export function warn(content) {
    return new Promise(resolve => {
        Modal.warn({
            title: "警告",
            content,
            centered,
            onOk: () => resolve()
        });
    });
}

export function remove() {
    return new Promise(resolve => {
        Modal.confirm({
            title: "确定要删除吗？",
            content: "",
            okText: "删除",
            cancelText: "取消",
            centered,
            onOk: () => resolve()
        });
    });
}

import _confirm from "./confirm";

export const confirm = _confirm;