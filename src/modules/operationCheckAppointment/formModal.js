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
                http.post(data ? "/sick/updateSubscribe" : "/sick/addSubscribe", {
                    ...values,
                    date: values.date.format("YYYY-MM-DD HH:mm"),
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
                    title={data != null ? "编辑患者" : "新增患者"}
                    maskClosable={false}
                    centered
                    visible={visible}
                    okText={data != null ? "修改" : "保存"}
                    onCancel={this.handleHideModal}
                    onOk={this.handleSubmit}
                >
                    <Form className="patient-form-modal">
                        <Form.Item {...formItemLayout} label="姓名">
                            {getFieldDecorator("subscribeName", {
                                rules: [
                                    { required: true, message: "姓名是必填字段！" }
                                ],
                                initialValue: data && data.subscribeName
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="预约时间">
                            {getFieldDecorator("date", {
                                rules: [
                                    { required: true, message: "请选择预约时间！" }
                                ],
                                initialValue: data && data.date && moment(data.date, "YYYY-MM-DD HH:mm:ss")
                            })(
                                <DatePicker
                                    style={{ width: "100%" }}
                                    format="YYYY-MM-DD HH:mm"
                                    showTime={{ format: "HH:mm" }}
                                    disabledDate={(current) => current && current < moment().subtract(1, "day")}
                                    disabledTime={date => {
                                        function range(start, end) {
                                            const result = [];
                                            for (let i = start; i < end; i++) {
                                                result.push(i);
                                            }
                                            return result;
                                        }
                                        let now = moment();
                                        if (date.format("YYYY-MM-DD") == now.format("YYYY-MM-DD")) {
                                            return {
                                                disabledHours: () => range(0, 24).filter(item => item < now.hour()),
                                                disabledMinutes: hour => range(0, 60).filter(item => hour === now.hour() && item < now.minute())
                                            }
                                        }
                                        return null;
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系方式">
                            {getFieldDecorator("mobilePhone", {
                                rules: [
                                    { required: true, message: "联系方式是必填字段！" },
                                    { pattern: /^(1[3456789]\d{9})|(\d{3,4}(-|\s)?\d{7})$/, message: "请输入正确的联系方式！" }
                                ],
                                initialValue: data && data.mobilePhone
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="备注">
                            {getFieldDecorator("remark", {
                                initialValue: data && data.remark
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
