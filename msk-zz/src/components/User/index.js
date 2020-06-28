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
    return <Form form={form}>
        <Form.Item name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
        </Form.Item>
        <Form.Item name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="off" />
        </Form.Item>
    </Form>
};

const RegisterForm = ({ form }) => {
    return <Form form={form} {...formItemLayout}>
        <Form.Item name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password />
        </Form.Item>
        <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
                { required: true, message: 'Please input your Password!' },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
            ]}>
            <Input.Password autoComplete="off" />
        </Form.Item>
        <Form.Item name="nickname"
            label={
                <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            }
            rules={[{ required: true, message: 'Please input your Nickname!', whitespace: true }]}
        >
            <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="email"
            label="E-mail"
            rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' }
            ]}
        >
            <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your Phone!' }]}
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
            <Tabs.TabPane tab={intl.formatMessage({ id: 'BTN_LOGIN' })} key="login">
                <LoginForm form={loginForm} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={intl.formatMessage({ id: 'BTN_REGISTER' })} key="register">
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