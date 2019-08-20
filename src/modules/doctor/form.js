import { Form, Input, Select, Button } from "antd";
import { confirm } from "components/alert";
import React from "react";
import http from "utils/http";

const { Option } = Select;

const Container = Form.create()(class FormModal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            const { onSubmit, data } = this.props;
            if (data) values.id = data.id;
            http.post(data ? "/user/updateUserInfo" : "/user/addUserInfo", values).then(() => {
                onSubmit && onSubmit();
            })
        })
    }
    handleClose = e => {
        e.preventDefault();
        const { onClose } = this.props;
        onClose && onClose();
    }
    render() {
        const { data } = this.props;
        const { getFieldDecorator } = this.props.form;
        return <React.Fragment>
            <div className="modal-form-title">{data ? "编辑" : "添加"}医生</div>
            <Form>
                <Form.Item label="姓名">
                    {getFieldDecorator("name", {
                        rules: [
                            { required: true, message: "姓名是必填字段" }
                        ]
                    })(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="用户名">
                    {getFieldDecorator("userName", {
                        initialValue: data && data.userName
                    })(<Input autoComplete="off" disabled />)}
                </Form.Item>
                <Form.Item label="手机">
                    {getFieldDecorator("phone", {
                        rules: [
                            { required: true, message: "手机号是必填字段" }
                        ]
                    })(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="职位">
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
            </Form>
            <div className="modal-form-button">
                <Button type="primary" onClick={this.handleSubmit}>{data ? "修改" : "保存"}</Button>
                <Button onClick={this.handleClose}>返回</Button>
            </div>
        </React.Fragment>
    }
})

export default function form(data) {
    return new Promise((resolve, reject) => {
        let { close } = confirm(<Container data={data} onSubmit={handleSubmit} onClose={handleClose} />);

        function handleSubmit() {
            close();
            resolve();
        }

        function handleClose(e) {
            close();
        }
    })
}