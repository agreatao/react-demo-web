import { ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import "lib/browser";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "store";
moment.locale("zh-cn");

export default function entry(ReactNode, container) {
    render(
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                {ReactNode}
            </ConfigProvider>
        </Provider>,
        container || document.getElementById("app")
    );
}