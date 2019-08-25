import React from "react";

import "./style";
import entry from "utils/entry";


import { Form, Icon, Input, Button, Checkbox } from 'antd';
import http from "utils/http";

import Cookie from "js-cookie";

const Login = Form.create({ name: 'normal_login' })(class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            http.post("/login/loginCheck", values).then(data => {
                Cookie.set("user", data.result.userInfo, { expires: 1 });
                Cookie.set("token", data.result.tokenId, { expires: 1 });
                window.location.href = CONFIG.baseURL + "/patient";
            })
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入登录名' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-submit-btn">登录</Button>
                    {/* <a href="">注册</a> */}
                </Form.Item>
            </Form>
        );
    }
});
entry(<Login />)