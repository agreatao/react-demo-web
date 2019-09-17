import { Form, Input, Select, Button } from "antd";
import { dialog } from "components/alert";
import React from "react";
import http from "utils/http";

const { Option } = Select;

const layout = {
    labelCol: {
        sm: { span: 6 }
    },
    wrapperCol: {
        sm: { span: 16 }
    },
    colon: false
};

const AddOrEditForm = Form.create()(class FormModal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            const { data } = this.props;
            if (data) values.id = data.id;
            http.post(data ? "/user/updateUserInfo" : "/user/addUserInfo", values).then(() => {
                this.props.onSuccess && this.props.onSuccess();
            })
        })
    }
    handleClose = e => {
        e.preventDefault();
        this.props.form.resetFields();
        this.props.onCancel && this.props.onCancel();
    }
    render() {
        const { data } = this.props;
        const { getFieldDecorator } = this.props.form;
        return <Form>
            <div className="form-modal-title">{data ? "编辑" : "添加"}医生</div>
            <Form.Item {...layout} label="姓名">
                {getFieldDecorator("name", {
                    rules: [
                        { required: true, message: "姓名是必填字段" }
                    ]
                })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...layout} label="用户名">
                {getFieldDecorator("userName", {
                    initialValue: data && data.userName
                })(<Input autoComplete="off" disabled />)}
            </Form.Item>
            <Form.Item {...layout} label="手机">
                {getFieldDecorator("phone", {
                    rules: [
                        { required: true, message: "手机号是必填字段" }
                    ]
                })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...layout} label="职位">
                {getFieldDecorator("roleId", {
                    initialValue: data && data.roleId,
                    rules: [
                        { required: true, message: "职位是必填字段" }
                    ]
                })(<Select>
                    <Option value="2">医生</Option>
                    <Option value="3">护士</Option>
                </Select>)}
            </Form.Item>
            <div className="form-modal-button">
                <Button type="primary" onClick={this.handleSubmit}>{data ? "修改" : "保存"}</Button>
                <Button onClick={this.handleReset}>返回</Button>
            </div>
        </Form>
    }
})

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