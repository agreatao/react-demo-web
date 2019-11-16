import { Layout, Menu, Button } from "antd";
import { connect } from "dva";
import React, { useState } from "react";
import "./index.less";

const { Header, Content, Footer } = Layout;

function Master({ height, children, history }) {
    const [key, setKey] = useState("VectorAnalysisCalculator1");

    function handlePageChange(e) {
        setKey(e.key);
        history.push(`/${e.key}`);
    }

    return <Layout className="zz-master">
        <Header className="zz-header">
            <div className="zz-logo">ZZ Formula</div>
            <Menu
                className="zz-nav"
                theme="dark"
                mode="horizontal"
                selectedKeys={[key]}
                onSelect={handlePageChange}
            >
                <Menu.Item key="VectorAnalysisCalculator1">Vector Analysis Calculator1</Menu.Item>
                <Menu.Item key="ZZOKFormula">ZZ OK Formula</Menu.Item>
                <Menu.Item key="Toriciol">Toric iol</Menu.Item>
                <Menu.Item key="VR">VR</Menu.Item>
                <Menu.Item key="ZZIOL">ZZ IOL</Menu.Item>
                <Menu.Item key="Addsub">Add. &amp; sub</Menu.Item>
                <Menu.Item key="TICLTORATION">TICL TORATION</Menu.Item>
                <Menu.Item key="ZZLAS">ZZ δQ &amp; LAS</Menu.Item>
            </Menu>
        </Header>
        <Content className="zz-section" style={{ height }}>
            {children}
        </Content>
        <Footer className="zz-footer">
            <p>Hangzhou MSK Eye Hospital</p>
        </Footer>
    </Layout>
}

export default connect(
    ({ browser }) => ({
        height: browser.height - 120
    })
)(Master);

export const Container = ({ form, result, onCaculate, onClear }) => {
    return <div className="zz-container">
        <div className="zz-inner-container">
            <div className="zz-title">INPUT</div>
            <div className="zz-form">
                {form}
            </div>
            <div className="zz-form-buttons">
                <Button type="primary" onClick={onCaculate}>Calculate</Button>
                <Button onClick={onClear}>Clear</Button>
            </div>
        </div>
        <div className="zz-inner-container">
            <div className="zz-title">OUTPUT</div>
            <div className="zz-result">
                {result}
            </div>
        </div>
    </div>
}