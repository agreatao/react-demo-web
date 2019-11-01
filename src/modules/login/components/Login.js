import React from "react";
import "./Login.less";
import { Form, Input, Button } from "antd";
import { login } from "services/login";

export default Form.create()(
    ({ form }) => {
        const { getFieldDecorator, validateFields, setFields } = form;

        function handleSubmit(e) {
            e.preventDefault();
            validateFields((err, values) => {
                if (err) return;
                login(values).then(data => {
                    const { tokenId, userInfo } = data;
                    window.location.href = `${CONFIG.baseURL}/sickInfo`;
                }).catch(e => {
                    setFields({
                        userName: {
                            value: ""
                        },
                        password: {
                            value: "",
                            errors: [new Error("用户名或密码错误")]
                        }
                    })
                })
            })
        }

        return <div className="login-container">
            <h4>登录</h4>
            <Form className="login-form">
                <Form.Item>
                    {getFieldDecorator("userName", {
                        rules: [
                            { required: true, message: "请输入用户名" }
                        ]
                    })(<Input autoComplete="off" placeholder="用户名" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [
                            { required: true, message: "请输入密码" }
                        ]
                    })(<Input autoComplete="off" type="password" placeholder="密码" />)}
                </Form.Item>
            </Form>
            <div className="login-btns">
                <a>忘记密码？</a>
            </div>
            <div className="login-btns">
                <Button className="login-submit-btn" onClick={handleSubmit}>登录</Button>
            </div>
        </div>
    }
)
