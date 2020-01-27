import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import antd_en from "antd/es/locale/en_US";
import antd_zh from 'antd/es/locale/zh_CN';
import { connect } from 'react-redux';
import en from "./en_US.json";
import zh from './zh_CN.json';

const antd_lang = {
    en: antd_en,
    zh: antd_zh
}

const lang = {
    en,
    zh
}

export default connect(
    ({ locale }) => ({ locale: locale.lang })
)(
    function Antdi18n({ children, locale }) {
        return <ConfigProvider locale={antd_lang[locale]}>
            <IntlProvider locale={locale} messages={lang[locale]}>
                {children}
            </IntlProvider>
        </ConfigProvider>
    }
)