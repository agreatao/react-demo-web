import { ConfigProvider } from 'antd';
import antd_en from "antd/es/locale/en_US";
import antd_zh from 'antd/es/locale/zh_CN';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
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

export default connect()(
    function Antdi18n({ children, match, dispatch }) {
        const { locale, method } = match.params;

        useEffect(() => {
            dispatch({ type: '@Locale/CHANGE', locale, method })
        })

        return <ConfigProvider locale={antd_lang[locale]}>
            <IntlProvider locale={locale} messages={lang[locale]}>
                {children}
            </IntlProvider>
        </ConfigProvider>
    })