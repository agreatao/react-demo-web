import { Menu, Button, Select, Alert, Row, Col, Icon, Drawer } from "antd";
import { connect } from "dva";
import React, { useState } from "react";
import "./index.less";
import { useIntl } from "react-intl";
const { Option } = Select;

function Master({ children, history, nav, i18n, dispatch }) {

    const [visible, setVisible] = useState(false);

    function handlePageChange(e) {
        history.push(`/${e.key}`);
    }

    function setLang() {
        dispatch({ type: "i18n/toggleLang" });
        setVisible(false);
    }

    return <React.Fragment>
        <div id="header">
            <div className="header-inner">
                <Icon
                    type="menu"
                    className="nav-phone-icon"
                    onClick={() => setVisible(true)}
                />
                <Drawer
                    visible={visible}
                    onClose={() => setVisible(false)}
                >
                    <div>
                        <Button
                            className="header-lang-button"
                            size="small"
                            onClick={setLang}
                        >{i18n}</Button>
                        <Select
                            className="version"
                            dropdownClassName="version-dropdown"
                            defaultValue="index"
                            size="small"
                            style={{ width: 78 }}
                        >
                            <Option key="index" value="index">v1.0.0</Option>
                        </Select>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[history.location.pathname.replace("/", "")]}
                        onSelect={handlePageChange}
                    >
                        {nav && nav.map(item => <Menu.Item key={item.key}>{item.text}</Menu.Item>)}
                    </Menu>
                </Drawer>
                <Row gutter={0}>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                        <div className="logo">ZZ Formula</div>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={20} xl={20} xxl={20}>
                        <Button
                            className="header-lang-button"
                            size="small"
                            onClick={setLang}
                        >{i18n}</Button>
                        <Select
                            className="version"
                            dropdownClassName="version-dropdown"
                            defaultValue="index"
                            size="small"
                            style={{ width: 78 }}
                        >
                            <Option key="index" value="index">v1.0.0</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        </div>
        <Row gutter={0}>
            <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={3}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[history.location.pathname.replace("/", "")]}
                    onSelect={handlePageChange}
                >
                    {nav && nav.map(item => <Menu.Item key={item.key}>{item.text}</Menu.Item>)}
                </Menu>
            </Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={21}>
                {children}
            </Col>
        </Row>
    </React.Fragment>
}

export default connect(
    ({ i18n }) => ({
        i18n: i18n.label
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