import React from "react";
import { Modal, Form, Input } from "antd";
import ReactDOM from "react-dom";

const ModalForm = Form.create()(class extends React.Component {
    state = {
        visible: true
    }
    handleHideModal = e => {
        e.preventDefault();
        this.props.form.resetFields();
        this.setState({ visible: false }, () => {
            this.props.onAfterClose && this.props.onAfterClose();
        });
    }
    render() {
        const { data } = this.props;
        const { visible } = this.state;
        const { getFieldDecorator } = this.props.form;
        return <Modal title={data != null ? "编辑患者" : "新增患者"} maskClosable={false} centered visible={visible} onCancel={this.handleHideModal}>
            <Form>
                <Form.Item label="姓名">
                    {getFieldDecorator("name", {})(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    }
})

export default function (data) {
    return new Promise((resolve) => {
        let container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<ModalForm data={data} onAfterClose={() => {
            let timeout = setTimeout(() => {
                clearTimeout(timeout);
                ReactDOM.unmountComponentAtNode(container);
                container.remove();
            }, 500);
            resolve();
        }} />, container);
    })
}