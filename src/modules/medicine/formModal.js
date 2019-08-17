import React from "react";
import {
    ConfigProvider,
    Modal,
    Form,
    Input,
    DatePicker
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import ReactDOM from "react-dom";
import http from "utils/http";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 18 },
    },
};

const ModalForm = Form.create()(
    class extends React.Component {
        state = {
            visible: true
        };
        handleHideModal = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.setState({ visible: false }, () => {
                this.props.onAfterClose && this.props.onAfterClose(false);
            });
        }
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                const { data } = this.props;
                http.post(data ? "/drug/updateDrugInfo" : "/drug/addDrugInfo", {
                    ...values,
                    id: data && data.id
                }).then(() => {
                    this.setState({ visible: false }, () => {
                        this.props.onAfterClose && this.props.onAfterClose(true);
                    });
                }).catch(e => { })
            })
        }
        render() {
            const { data } = this.props;
            const { visible } = this.state;
            const { getFieldDecorator } = this.props.form;
            return (
                <Modal
                    title={data != null ? "编辑药品" : "新增药品"}
                    maskClosable={false}
                    centered
                    visible={visible}
                    okText={data != null ? "修改" : "保存"}
                    onCancel={this.handleHideModal}
                    onOk={this.handleSubmit}
                >
                    <Form className="patient-form-modal">
                        <Form.Item {...formItemLayout} label="药品名称">
                            {getFieldDecorator("drugName", {
                                rules: [
                                    { required: true, message: "药品名称是必填字段！" }
                                ],
                                initialValue: data && data.drugName
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="规格">
                            {getFieldDecorator("norms", {
                                rules: [
                                    { required: true, message: "药品规格是必填字段" }
                                ],
                                initialValue: data && data.norms
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="形状">
                            {getFieldDecorator("drugShape", {
                                initialValue: data && data.mobilePhone
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="适应症">
                            {getFieldDecorator("suitType", {
                                initialValue: data && data.suitType
                            })(<TextArea />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="成份">
                            {getFieldDecorator("composition", {
                                initialValue: data && data.composition
                            })(<TextArea />)}
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
                    onAfterClose={isUpdate => {
                        let timeout = setTimeout(() => {
                            clearTimeout(timeout);
                            ReactDOM.unmountComponentAtNode(container);
                            container.remove();
                        }, 500);
                        resolve(isUpdate);
                    }}
                />
            </ConfigProvider>,
            container
        );
    });
}
