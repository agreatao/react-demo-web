import { isLogin } from '@/api/user';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import "theme/index.less";
import browserBind from "./browserBind";
import "./index.less";

browserBind(store);

const { dispatch } = store;

export function initApp(children) {
    ReactDOM.render(
        <Provider store={store}>
            <ConfigProvider locale={zh_CN}>
                {children}
            </ConfigProvider>
        </Provider>
        ,
        document.getElementById('app'),
    )
}

export function loginApp(children) {
    // 判断登录
    isLogin.send()
        .then(user => {
            dispatch({ type: '@User/LOGIN', user });
            initApp(children);
        })
        .catch(e => {
            window.location.replace('/login.html');
        });
}