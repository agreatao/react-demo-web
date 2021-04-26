import { ConfigProvider } from "antd";
import React from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

const ANTD = {
    en: require("antd/es/locale/en_US"),
    cn: require("antd/es/locale/zh_CN"),
};

export default function LocaleProvider({ children, messages }) {
    if (!messages) throw new Error("locale messages is not defined");
    const lang = useSelector((state) => state.locale);
    return (
        <ConfigProvider lang={ANTD[lang]}>
            <IntlProvider locale={lang} messages={messages[lang]}>
                {children}
            </IntlProvider>
        </ConfigProvider>
    );
}
