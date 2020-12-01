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

browserBind(store);

const { dispatch, getState } = store;

const enUS = http("/i18n/en_US.json", { checkStatus: false });
const zhCN = http("/i18n/zh_CN.json", { checkStatus: false });

let locale;
function loadLocale() {
    return new Promise((resolve) => {
        if (locale) resolve(locale);
        return Promise.all([
            enUS.get().then(({ data }) => data),
            zhCN.get().then(({ data }) => data),
        ])
            .then(([enUS, zhCN]) => {
                locale = { enUS, zhCN };
                dispatch("@Locale/init", { locale, lang: "en_US" });
                resolve(locale);
            })
            .catch((e) => {});
    });
}

function loginUser() {
    return isLogin
        .post()
        .then((user) => {})
        .catch((e) => {});
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
