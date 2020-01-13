import { Layout, Menu, Button, Select, Alert } from "antd";
import { connect } from "dva";
import React from "react";
import "./index.less";
import { useIntl } from "react-intl";
import { LANG } from "models/i18n";
const { Option } = Select;

const { Header, Content, Sider } = Layout;

function Master({ children, history, nav, i18n, dispatch }) {

    function handlePageChange(e) {
        history.push(`/${e.key}`);
    }

    function handleVersionChange(e) {
        // window.location.href = e.target.value;
    }

    return <Layout className="zz-layout">
        <Header className="zz-header">
            <div className="logo">ZZ Formula</div>
            <div className="version">
                <Select
                    onChange={handleVersionChange}
                    defaultValue="index"
                    size="small"
                    dropdownClassName="ant-select-sm-dropdown"
                    style={{ width: 78 }}
                >
                    <Option key="index" value="index">v1.0.0</Option>
                </Select>
                <Select
                    defaultValue={i18n}
                    size="small"
                    dropdownClassName="ant-select-sm-dropdown"
                    style={{ width: 110, marginLeft: 10 }}
                    onChange={(e) => {
                        dispatch({ type: "i18n/setLang", lang: e })
                    }}
                >
                    {LANG.map(({ label, value }) => <Option key={value} value={value}>{label}</Option>)}
                </Select>
            </div>
        </Header>
        <Layout style={{ flex: 1, overflow: "hidden" }}>
            <Sider width={240} style={{ backgroundColor: "#fff" }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[history.location.pathname.replace("/", "")]}
                    onSelect={handlePageChange}
                >
                    {nav && nav.map(item => <Menu.Item key={item.key}>{item.text}</Menu.Item>)}
                </Menu>
            </Sider>
            <Content>
                {children}
            </Content>
        </Layout>
    </Layout>
}

export default connect(
    ({ i18n }) => ({
        i18n: i18n.lang
    })
)(Master);

export const Container = ({ tip, form, result, onCaculate, onClear }) => {
    const intl = useIntl();
    return <div className="zz-container">
        {tip && Object.keys(tip).map((item, index) =>
            <Alert key={index}
                message={intl.formatMessage({ id: item })}
                description={tip[item]}
                type={item === "INSTRUCTIONS" ? "success" : "error"}
            />)}
        <div className="zz-container-inner">
            <div className="zz-inner-container">
                <div className="zz-title">{intl.formatMessage({ id: "INPUT" })}</div>
                <div className="zz-form">
                    {form}
                </div>
                <div className="zz-form-buttons">
                    <Button type="primary" onClick={onCaculate}>{intl.formatMessage({ id: "CALCULATE" })}</Button>
                    <Button onClick={onClear}>{intl.formatMessage({ id: "CLEAR" })}</Button>
                </div>
            </div>
            <div className="zz-inner-container">
                <div className="zz-title">{intl.formatMessage({ id: "OUTPUT" })}</div>
                <div className="zz-result">
                    {result}
                </div>
            </div>
        </div>
    </div>
}