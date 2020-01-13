import React from 'react';
import { ConfigProvider } from 'antd';
import en from "antd/es/locale/en_US";
import zh from 'antd/es/locale/zh_CN';
import { connect } from 'dva';

const lang = {
    en,
    zh
}

export default connect(
    ({ i18n }) => ({ i18n: i18n.lang })
)(
    function Antdi18n({ children, i18n }) {
        return <ConfigProvider locale={lang[i18n]}>
            {children}
        </ConfigProvider>
    }
)