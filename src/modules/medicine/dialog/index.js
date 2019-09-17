import { Form, Input, Button } from "antd";
import { dialog } from "components/alert";
import React from "react";
import http from "utils/http";
import { Editor, EditorState } from "draft-js";

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

const AddOrEditForm = Form.create()(
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
                <div className="form-modal-title">{data != null ? "编辑药品" : "新增药品"}</div>
                <Form.Item {...layout} label="药品名称">
                    {getFieldDecorator("drugName", {
                        rules: [
                            { required: true, message: "药品名称是必填字段！" }
                        ],
                        initialValue: data && data.drugName
                    })(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...layout} label="规格">
                    {getFieldDecorator("norms", {
                        rules: [
                            { required: true, message: "药品规格是必填字段" }
                        ],
                        initialValue: data && data.norms
                    })(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...layout} label="形状">
                    {getFieldDecorator("drugShape", {
                        initialValue: data && data.mobilePhone
                    })(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...layout} label="适应症">
                    {getFieldDecorator("suitType", {
                        initialValue: data && data.suitType
                    })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item {...layout} label="成份">
                    {getFieldDecorator("composition", {
                        initialValue: data && data.composition
                    })(<TextArea rows={4} />)}
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