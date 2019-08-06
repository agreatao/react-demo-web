import {
    LocaleProvider
} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "lib/browser";
import React from "react";
import {
    render
} from "react-dom";
import {
    Provider
} from "react-redux";
import store from "store";

import "moment/locale/zh-cn";
import moment from "moment";
moment.locale("zh-cn");

export default function entry(ReactNode) {
    render(
        <Provider store={store}>
            <LocaleProvider locale={zh_CN}>
                <React.Fragment>
                    {ReactNode}
                </React.Fragment>
            </LocaleProvider>
        </Provider>,
        document.getElementById("app")
    );
}