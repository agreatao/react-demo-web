import React from 'react';
import Nav from './Nav';
import "./index.less";
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useHistory } from 'react-router';

const LocaleButton = connect(
    ({ locale }) => ({ lang: locale.lang })
)(
    function LocaleButton({ lang }) {
        const history = useHistory();
        function go() {
            let { pathname } = history.location;
            pathname = pathname.replace(lang, lang === 'en' ? 'zh' : 'en');
            history.push(pathname);
        }
        return <Button size="small" onClick={go}>{lang === 'en' ? '中文' : 'English'}</Button>
    }
)


export default function Master({ children }) {
    return <React.Fragment>
        <div id="header">
            <div className="logo">ZZ Formula</div>
            <LocaleButton />
        </div>
        <div className="section">
            <Nav />
            <div className="content">
                {children}
            </div>
        </div>
    </React.Fragment>
}