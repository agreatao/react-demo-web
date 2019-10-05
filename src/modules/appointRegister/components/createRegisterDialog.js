import { Button, Form, Input } from "antd";
import { createXDialog } from "components/Dialog";
import React from "react";

const RegisterForm = Form.create({
    mapPropsToFields: props => {
        let fields = {};
        for (let name in props.data) {
            fields[name] = Form.createFormField({
                value: props.data[name]
            })
        }
        return fields;
    }
})(
    ({ form, onCancel }) => {
        const { getFieldDecorator } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
            })
        }

        return <React.Fragment>
            <Form>
                <Form.Item label="姓名">
                    {getFieldDecorator('name')(<Input autoComplete="off" />)}
                </Form.Item>
            </Form>
            <div>
                <Button onClick={onCancel}>取消</Button>
                <Button type="primary" onClick={handleSubmit}>保存</Button>
            </div>
        </React.Fragment>
    }
)

export default function createRegisterDialog(data) {
    createXDialog({
        title: data && data.id ? "编辑" : "新增",
        children: ({ close }) => <RegisterForm data={data} onCancel={close} />
    })
}