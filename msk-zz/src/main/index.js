import { isLogin } from "api/user";
import LocaleProvider from "Locale/Provider";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import "theme/index.less";
import "utils";
import http from "utils/http";
import browserBind from "./browserBind";
import "./index.less";
import urlParse from "utils/urlParse";

browserBind(store);

const { dispatch, getState } = store;

const enUS = http("/i18n/en_US.json", {
    checkStatus: false,
    headers: {
        "Cache-Control": "max-age=3600",
    },
});
const zhCN = http("/i18n/zh_CN.json", {
    checkStatus: false,
    headers: {
        "Cache-Control": "max-age=3600",
    },
});

function loadLocale() {
    return new Promise((resolve) => {
        const languages = getState().locale.languages;
        const { locale } = urlParse("/:locale/:page/:method?", location.pathname);
        if (languages) {
            dispatch({ type: "@Locale/CHANGE", lang: locale });
            resolve();
            return;
        }
        return Promise.all([
            enUS.get().then(({ data }) => data),
            zhCN.get().then(({ data }) => data),
        ]).then(([en_US, zh_CN]) => {
            dispatch({ type: "@Locale/INIT", languages: { en_US, zh_CN }, lang: locale });
            resolve();
        });
    });
}

function loginUser() {
    return isLogin
        .post()
        .then((user) => {})
        .catch((e) => {
            // console.log("登录未成功");
        });
}

export function initApp(children, wrapper = document.getElementById("app")) {
    Promise.all([loadLocale(), loginUser()]).finally(() => {
        ReactDOM.render(
            <Provider store={store}>
                <LocaleProvider>{children}</LocaleProvider>
            </Provider>,
            wrapper
        );
    });
}
