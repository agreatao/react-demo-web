import { Button, Select } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import './index.less';

const { Option } = Select;

export default connect(
    ({ locale }) => ({ lang: locale.label })
)(function VersionAndLocale({ lang, dispatch, onChange }) {

    function setVersion(version) {
        onChange && onChange();
    }

    function toggleLang(e) {
        dispatch({ type: 'TOGGLE' });
        onChange && onChange(e);
    }

    return <React.Fragment>
        <Button
            className="header-lang-button"
            size="small"
            onClick={toggleLang}
        >{lang}</Button>
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
})