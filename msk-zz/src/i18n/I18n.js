import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'dva';
import en from "i18n/en_US";
import zh from 'i18n/zh_CN';

const lang = {
    en,
    zh
}

export default connect(
    ({ i18n }) => ({ i18n: i18n.lang })
)(
    function I18n({ children, i18n }) {
        return <IntlProvider locale={i18n} messages={lang[i18n]}>
            {children}
        </IntlProvider>
    }
)