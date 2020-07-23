import { LockOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Tabs, Tooltip } from 'antd';
import LocaleProvider from 'components/Locale/Provider';
import React, { useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import store from 'store';
import { useIntl } from 'react-intl';
import { login, register, isLogin } from '@/api/user';

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

    return <Form form={form}>
        <Form.Item name="username"
            rules={[{ required: true, message: intl.formatMessage({ id: 'form.rules.required.username' }) }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
        </Form.Item>
        <Form.Item name="password"
            rules={[{ required: true, message: intl.formatMessage({ id: 'form.rules.required.password' }) }]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="off" />
        </Form.Item>
    </Form>
};

const RegisterForm = ({ form }) => {
    const intl = useIntl();

    return <Form form={form} {...formItemLayout}>
        <Form.Item name="username"
            label={intl.formatMessage({ id: 'form.field.username' })}
            rules={[{ required: true, message: intl.formatMessage({ id: 'form.rules.required.username' }) }]}
        >
            <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="password"
            label={intl.formatMessage({ id: "form.field.password" })}
            rules={[{ required: true, message: intl.formatMessage({ id: 'form.rules.required.password' }) }]}>
            <Input.Password />
        </Form.Item>
        <Form.Item
            name="confirmPassword"
            label={intl.formatMessage({ id: "form.field.confirmPassword" })}
            dependencies={['password']}
            rules={[
                { required: true, message: intl.formatMessage({ id: 'form.rules.required.confirmPassword' }) },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(intl.formatMessage({ id: "form.rules.confirmPassword.different" }));
                    },
                }),
            ]}>
            <Input.Password autoComplete="off" />
        </Form.Item>
        <Form.Item name="nickname"
            label={
                <span>
                    {intl.formatMessage({ id: "form.field.nickname" })}&nbsp;
                    <Tooltip title={intl.formatMessage({ id: "form.field.nickname.tooltip" })}>
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            }
            rules={[{ required: true, message: intl.formatMessage({ id: "form.rules.required.nickname" }), whitespace: true }]}
        >
            <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="email"
            label={intl.formatMessage({ id: 'form.field.email' })}
            rules={[
                { required: true, message: intl.formatMessage({ id: "form.rules.required.email" }) },
                { type: 'email', message: intl.formatMessage({ id: "form.rules.email.valid" }) },
            ]}
        >
            <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="phone"
            label={intl.formatMessage({ id: "form.field.phone" })}
            rules={[{ required: true, message: intl.formatMessage({ id: "form.rules.required.phone" }) }]}
        >
            <Input
                addonBefore="+86"
                style={{
                    width: '100%',
                }}
            />
        </Form.Item>
    </Form>
};

export default function UserModal({ defaultActiveTab = 'login', onCancel, onLogin }) {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [visible, setVisible] = useState(true);
    const intl = useIntl();

    const [loginForm] = Form.useForm();
    const [registerForm] = Form.useForm();

    function handleTabChange(tab) {
        setActiveTab(tab);
    }

    function handleCancel() {
        setVisible(false);
        onCancel && onCancel();
    }

    function handleSubmit() {
        new Promise((resolve, reject) => {
            if (activeTab === 'login')
                loginForm.validateFields().then(async values => {
                    try {
                        const { username, password } = values;
                        const user = await login.send({ username, password });
                        if (!user) {
                            reject('登录失败');
                            return;
                        }
                        resolve(user);
                    } catch (e) {
                        reject(e);
                    }
                });
            else if (activeTab === 'register')
                registerForm.validateFields().then(async values => {
                    try {
                        const user = await register.send(values);
                        if (!user) {
                            reject('注册失败');
                            return;
                        }
                        resolve(user);
                    } catch (e) {
                        reject(e);
                    }
                })
        }).then(user => {
            setVisible(false);
            dispatch({ type: '@User/LOGIN', user });
            onLogin && onLogin(user);
        }).catch(e => { });
    }

    return <Modal width={480} centered destroyOnClose visible={visible} onCancel={handleCancel} onOk={handleSubmit}>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <Tabs.TabPane tab={intl.formatMessage({ id: 'btn.login' })} key="login">
                <LoginForm form={loginForm} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={intl.formatMessage({ id: 'btn.register' })} key="register">
                <RegisterForm form={registerForm} />
            </Tabs.TabPane>
        </Tabs>
    </Modal>
};

let timer;

export function go(page) {
    return new Promise(async (resolve) => {
        const { getState, dispatch } = store;
        const { user } = getState();

        try {
            /**
             * 销毁延时，如果没完全销毁，则等待300ms
             */
            if (timer)
                await new Promise((resolve) => setTimeout(resolve, 300))
            if (user) {
                resolve(user);
                return;
            }
            const asyncUser = await isLogin.send();
            if (asyncUser) {
                dispatch({ type: '@User/LOGIN', user: asyncUser });
                resolve(asyncUser);
                return;
            }
        } catch (e) {
            console.error(e);
        }

        const wrapper = document.createElement('div');
        document.body.appendChild(wrapper);

        function destroyed() {
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                unmountComponentAtNode(wrapper);
                wrapper.remove();
            }, 300);
        }

        function handleCancel() {
            destroyed();
        }

        function handleLogin(user) {
            destroyed();
            resolve(user);
        }

        render(
            <Provider store={store}>
                <LocaleProvider languages={window.LANGUAGES}>
                    <UserModal defaultActiveTab={page} onCancel={handleCancel} onLogin={handleLogin} />
                </LocaleProvider>
            </Provider>, wrapper);
    });
}