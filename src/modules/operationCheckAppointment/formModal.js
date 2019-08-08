import React from "react";
import {
    ConfigProvider,
    Modal,
    Form,
    Input,
    DatePicker
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import ReactDOM from "react-dom";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 18 },
    },
};

const messageTemplate = "尊敬的{name}，您已预约近视激光术前检查，预约时间为{time}，如需改约请及时告知，电话0571-85318888.如需停车服务，请您务必提前预约。停车预约0571-85318899";

const ModalForm = Form.create()(
    class extends React.Component {
        state = {
            visible: true
        };
        handleHideModal = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.setState({ visible: false }, () => {
                this.props.onAfterClose && this.props.onAfterClose();
            });
        };
        render() {
            const { data } = this.props;
            const { visible } = this.state;
            const { getFieldDecorator, getFieldValue } = this.props.form;
            return (
                <Modal
                    title={data != null ? "编辑患者" : "新增患者"}
                    maskClosable={false}
                    centered
                    visible={visible}
                    onCancel={this.handleHideModal}
                >
                    <Form className="patient-form-modal">
                        <Form.Item {...formItemLayout} label="姓名">
                            {getFieldDecorator("name", {})(<Input />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="预约时间">
                            {getFieldDecorator("date", {})(
                                <DatePicker style={{ width: "100%" }} />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系方式">
                            {getFieldDecorator("phone", {})(<Input />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="短信内容">
                            {getFieldDecorator("message", {})(<TextArea />)}
                        </Form.Item>
                    </Form>
                </Modal >
            );
        }
    }
);

export default function (data) {
    return new Promise(resolve => {
        let container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(
            <ConfigProvider locale={zhCN}>
                <ModalForm
                    data={data}
                    onAfterClose={() => {
                        let timeout = setTimeout(() => {
                            clearTimeout(timeout);
                            ReactDOM.unmountComponentAtNode(container);
                            container.remove();
                        }, 500);
                        resolve();
                    }}
                />
            </ConfigProvider>,
            container
        );
    });
}
