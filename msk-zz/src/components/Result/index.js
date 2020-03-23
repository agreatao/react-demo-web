import React from 'react';
import { Modal } from 'antd';
import "./index.less";

export default function Result({ visible, children, onClose }) {
    return <Modal centered className="result-modal" visible={visible} onCancel={onClose} destroyOnClose footer={null}>
        {children}
    </Modal>
}