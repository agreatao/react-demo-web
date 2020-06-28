import { Button } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

export default function LocaleButton() {
    const lang = useSelector(state => state.locale.lang);
    const dispatch = useDispatch();
    const history = useHistory();
    function go() {
        let { pathname } = history.location;
        pathname = pathname.replace(lang, lang === 'en_US' ? 'zh_CN' : 'en_US');
        history.push(pathname);
        dispatch({ type: '@Locale/CHANGE', lang: lang === 'en_US' ? 'zh_CN' : 'en_US' });
    }
    return <Button size="small" onClick={go}>{lang === 'en_US' ? '中文' : 'English'}</Button>
}