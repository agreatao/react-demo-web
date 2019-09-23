import { Form, Input, Button } from "antd";
import { dialog } from "components/alert";
import React from "react";
import http from "utils/http";

const { TextArea } = Input;

const layout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
    colon: false
};

const AddOrEditForm = Form.create()(
    class extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                const { data } = this.props;
                http.post(data ? "/payments/updateChargeNotice" : "/payments/addChargeNotice", {
                    ...values,
                    id: data && data.id
                }).then(() => {
                    this.props.onSuccess && this.props.onSuccess();
                })
            })
        }
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onCancel && this.props.onCancel();
        }
        render() {
            const { data } = this.props;
            const { getFieldDecorator } = this.props.form;
            return <Form>
                <div className="form-modal-title">{data != null ? "编辑药品" : "新增药品"}</div>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item {...layout} label="姓名">
                            {getFieldDecorator("sickName", {
                                initialValue: data && data.sickName
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Form.Item {...layout} label="开票日期">
                            {getFieldDecorator("billingDate", {
                                initialValue: data && data.billingDate
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <div className="form-modal-button">
                    <Button type="primary" onClick={this.handleSubmit}>{data ? "修改" : "保存"}</Button>
                    <Button onClick={this.handleReset}>返回</Button>
                </div>
            </Form>
        }
    }
);

export const addOrEdit = data =>
    new Promise(resolve => {
        const { close } = dialog(<AddOrEditForm data={data} onSuccess={handleSuccess} onCancel={handleCancel} />, {
            width: 800
        });

        function handleSuccess() {
            close();
            resolve();
        }

        function handleCancel() {
            close();
        }
    });