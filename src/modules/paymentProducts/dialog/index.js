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
                http.post(data ? "/payments/updateCheckType" : "/payments/addCheckType", {
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
                <div className="form-modal-title">{data != null ? "编辑收费项目" : "新增收费项目"}</div>
                <Form.Item {...layout} label="收费项目名称">
                    {getFieldDecorator("checkTypeName", {
                        rules: [
                            { required: true, message: "收费项目名称是必填字段！" }
                        ],
                        initialValue: data && data.checkTypeName
                    })(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...layout} label="单位">
                    {getFieldDecorator("unit", {
                        rules: [
                            { required: true, message: "单位是必填字段" }
                        ],
                        initialValue: data && data.unit
                    })(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...layout} label="金额">
                    {getFieldDecorator("amount", {
                        initialValue: data && data.amount
                    })(<Input autoComplete="off" />)}
                </Form.Item>
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
        const { close } = dialog(<AddOrEditForm data={data} onSuccess={handleSuccess} onCancel={handleCancel} />);

        function handleSuccess() {
            close();
            resolve();
        }

        function handleCancel() {
            close();
        }
    });