import { Button, Form, Input } from "antd";
import React from "react";

const { TextArea } = Input;

const layout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 18 },
    },
    colon: false
};

export default Form.create()(
    class extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                const { data } = this.props;
                http.post(data ? "/drug/updateDrugInfo" : "/drug/addDrugInfo", {
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
                <div className="form-modal-title">{data != null ? "编辑患者" : "新增患者"}</div>
                <Form.Item {...layout} label="药品名称">
                    {getFieldDecorator("drugName", {
                        rules: [
                            { required: true, message: "药品名称是必填字段！" }
                        ],
                        initialValue: data && data.drugName
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