import { Button, Form, Icon, Input } from "antd";
import Cookie from "js-cookie";
import React from "react";
import entry from "utils/entry";
import http from "utils/http";
import "./style";

const Login = Form.create({ name: "normal_login" })(
    class NormalLoginForm extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                http.post("/login/loginCheck", values)
                    .then(data => {
                        Cookie.set("user", data.result.userInfo, { expires: 1 });
                        Cookie.set("token", data.result.tokenId, { expires: 1 });
                        window.location.href = CONFIG.baseURL + "/patient";
                    })
                    .catch(e => {
                        this.props.form.setFields({
                            userName: {
                                value: "",
                                errors: [new Error("")]
                            },
                            password: {
                                value: "",
                                errors: [new Error("用户名或密码错误")]
                            }
                        });
                    });
            });
        };

        handleFocus = e => {
            e.preventDefault();
            const { userName, password } = this.props.form.getFieldsError();
            if (userName || password) this.props.form.resetFields();
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2>XXXX医院管理系统登录</h2>
                    <Form.Item>
                        {getFieldDecorator("userName", {
                            rules: [{ required: true, message: "请输入登录名" }],
                            validateTrigger: "onSubmit"
                        })(<Input onFocus={this.handleFocus} prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="用户名" autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [{ required: true, message: "请输入密码" }],
                            validateTrigger: "onSubmit"
                        })(<Input onFocus={this.handleFocus} prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="密码" autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-submit-btn">
                            登录
                        </Button>
                        {/* <a href="">注册</a> */}
                    </Form.Item>
                </Form>
            );
        }
    }
);
entry(<Login />);
