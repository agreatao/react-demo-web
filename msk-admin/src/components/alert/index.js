import { Modal } from "antd";

const centered = true;

export function info(content) {
    return new Promise(onOk => {
        Modal.info({
            title: "提示",
            content,
            centered,
            onOk: () => onOk()
        });
    });
}

export function success(content) {
    return new Promise(onOk => {
        Modal.success({
            title: "提示",
            content,
            centered,
            onOk: () => onOk()
        });
    });
}

export function error(content) {
    return new Promise(onOk => {
        Modal.error({
            title: "错误",
            content,
            centered,
            onOk: () => onOk()
        });
    });
}

export function warn(content) {
    return new Promise(onOk => {
        Modal.warn({
            title: "警告",
            content,
            centered,
            onOk: () => onOk()
        });
    });
}

export function remove() {
    return new Promise(onOk => {
        Modal.confirm({
            title: "确定要删除吗？",
            content: "",
            okText: "删除",
            cancelText: "取消",
            centered,
            onOk: () => onOk()
        });
    });
}

export function confirm(content) {
    return new Promise((onOk, onCancel) => {
        Modal.confirm({
            title: "警告",
            content,
            okText: "确定",
            cancelText: "取消",
            centered,
            onOk: () => onOk(),
            onCancel: () => onCancel()
        });
    });
}
