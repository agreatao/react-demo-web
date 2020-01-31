import { Button, Select } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import './index.less';

const { Option } = Select;

export default function VersionAndLocale({ onChange }) {
    const history = useHistory();
    const { locale, method } = useParams();

    function setVersion(version) {
        onChange && onChange();
    }

    function toggleLang(e) {
        e.preventDefault();
        let _locale = locale === 'zh' ? 'en' : 'zh';
        history.push(`/${_locale}/${method}`);
        onChange && onChange();
        window.location.reload();
    }

    return <React.Fragment>
        <Button
            className="header-lang-button"
            size="small"
            onClick={toggleLang}
        >{locale === 'en' ? '中文' : 'English'}</Button>
        <Select
            className="version"
            dropdownClassName="version-dropdown"
            defaultValue="index"
            size="small"
            style={{ width: 78 }}
            onChange={setVersion}
        >
            <Option key="index" value="index">v1.0.0</Option>
        </Select>
    </React.Fragment>
}