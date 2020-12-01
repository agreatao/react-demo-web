import { ConfigProvider } from "antd";
import antd_en from "antd/es/locale/en_US";
import antd_zh from "antd/es/locale/zh_CN";
import React from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

const antd_lang = {
    en_US: antd_en,
    zh_CN: antd_zh,
};

export default function LocaleProvider({ children }) {
    const lang = useSelector((state) => state.locale.lang);
    return (
        <ConfigProvider locale={antd_lang[lang]}>
            <IntlProvider locale="en_US" messages={languages[lang]}>
                {children}
            </IntlProvider>
        </ConfigProvider>
    );
}
