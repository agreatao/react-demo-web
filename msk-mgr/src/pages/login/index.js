import "./index.less";
import React from "react";
import { initApp } from "@/main";
import { Row, Col, Form, Input, Button } from "antd";

function Login() {
    function handleSubmit(values) {}

    return (
        <div className="login-wrapper">
            <div className="login-banner"></div>
            <Row>
                <Col>
                    <div className="login-container">
                        <h4>登录</h4>
                        <Form onFinish={handleSubmit}>
                            <Form.Item>
                                <Input placeholder="用户名" name="username" />
                            </Form.Item>
                            <Form.Item placeholder="密码" name="password">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <a>忘记密码？</a>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

initApp(<Login />);
