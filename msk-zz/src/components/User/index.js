import { LockOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Tabs, Tooltip } from "antd";
import { login, register } from "api/user";
import { initApp } from "main";
import React, { useCallback, useState } from "react";
import { unmountComponentAtNode } from "react-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const LoginForm = ({ form }) => {
    const intl = useIntl();

    return (
        <Form form={form}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.username" }),
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    autoComplete="off"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.password" }),
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    autoComplete="off"
                />
            </Form.Item>
        </Form>
    );
};

const RegisterForm = ({ form }) => {
    const intl = useIntl();

    return (
        <Form form={form} {...formItemLayout}>
            <Form.Item
                name="username"
                label={intl.formatMessage({ id: "form.field.username" })}
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.username" }),
                    },
                ]}
            >
                <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
                name="password"
                label={intl.formatMessage({ id: "form.field.password" })}
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.password" }),
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label={intl.formatMessage({ id: "form.field.confirmPassword" })}
                dependencies={["password"]}
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.confirmPassword" }),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                intl.formatMessage({ id: "form.rules.confirmPassword.different" })
                            );
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="off" />
            </Form.Item>
            <Form.Item
                name="nickname"
                label={
                    <span>
                        {intl.formatMessage({ id: "form.field.nickname" })}&nbsp;
                        <Tooltip title={intl.formatMessage({ id: "form.field.nickname.tooltip" })}>
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.nickname" }),
                        whitespace: true,
                    },
                ]}
            >
                <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
                name="email"
                label={intl.formatMessage({ id: "form.field.email" })}
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.email" }),
                    },
                    {
                        type: "email",
                        message: intl.formatMessage({ id: "form.rules.email.valid" }),
                    },
                ]}
            >
                <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
                name="phone"
                label={intl.formatMessage({ id: "form.field.phone" })}
                rules={[
                    {
                        required: true,
                        message: intl.formatMessage({ id: "form.rules.required.phone" }),
                    },
                ]}
            >
                <Input
                    addonBefore="+86"
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default function UserModal({ visible = true, defaultActiveTab = "login", onCancel, onOK }) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [vis, setVisible] = useState(visible);

    const dispatch = useDispatch();
    const intl = useIntl();

    const [loginForm] = Form.useForm();
    const [registerForm] = Form.useForm();

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
        if (tab === "login") loginForm.resetFields();
        else if (tab === "register") registerForm.resetFields();
    }, []);

    const handleCancel = useCallback(() => {
        setVisible(false);
        onCancel && onCancel();
    }, []);

    const handleSubmit = useCallback(async () => {
        let user;
        try {
            if (activeTab === "login") {
                const { username, password } = await loginForm.validateFields().catch((e) => {});
                const { data, msg } = await login({ username, password });
                user = data;
                if (!user) throw new Error(intl.formatMessage({ id: msg }));
            } else if (activeTab === "register") {
                const formData = await registerForm.validateFields().catch((e) => {});
                const { data, msg } = await register(formData);
                user = data;
                if (!user) throw new Error(intl.formatMessage({ id: msg }));
            }
            dispatch({ type: "@User/LOGIN", user });
            typeof onOK === "function" && onOK(user);
            setVisible(false);
            return user;
        } catch (e) {
            message.error(e.msg);
        }
    }, []);

    return (
        <Modal
            width={480}
            centered
            destroyOnClose
            visible={vis}
            onCancel={handleCancel}
            onOk={handleSubmit}
            maskClosable={false}
        >
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <Tabs.TabPane tab={<FormattedMessage id="btn.login" />} key="login">
                    <LoginForm form={loginForm} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<FormattedMessage id="btn.register" />} key="register">
                    <RegisterForm form={registerForm} />
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    );
}

export function go(page) {
    return new Promise((resolve) => {
        try {
            const wrapper = document.createElement("div");
            document.body.appendChild(wrapper);

            function destroyed() {
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                    unmountComponentAtNode(wrapper);
                    wrapper.remove();
                }, 300);
            }

            function handleCancel() {
                destroyed();
            }

            function handleOk(user) {
                destroyed();
                resolve(user);
            }

            initApp(
                <UserModal
                    visible={true}
                    defaultActiveTab={page}
                    onCancel={handleCancel}
                    onOK={handleOk}
                />,
                wrapper
            );
        } catch (e) {}
    });
}
