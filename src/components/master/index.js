import { Icon, Layout, Menu } from "antd";
import classnames from "classnames";
import { connect } from "dva";
import { Link } from "dva/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Queue, Doctor, Patient } from "./icons";
import "./index.less";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const XMaster = ({ children, height, routes }) => {
    const [collapsed, setCollapsed] = useState(false);
    let pathname = window.location.hash;
    pathname = pathname.replace("#", "");
    return <Layout className="x-master">
        <Header className="x-master-header">
            <div className="logo"></div>
        </Header>
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                <Menu style={{ height: height - 50 }} className="x-master-nav" theme="dark" mode="inline">
                    {/* <SubMenu
                        key="appoint"
                        title={
                            <span>
                                <Icon type="clock-circle" />
                                <span>预约管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="appointRegister">挂号预约</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu> */}
                    <Menu.Item key="patient"><Patient /><span>患者信息管理</span></Menu.Item>
                    <SubMenu key="check"
                        title={<span><Icon type="solution" /><span>检查管理</span></span>}>
                        <Menu.Item key="sickNormalCheck">常规检查</Menu.Item>
                        <Menu.Item key="sickSpecialCheck">常规检查</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content>
                {routes && routes.length > 0 && <div className="x-master-routes">
                    {routes && routes.map(item => <Link className={classnames({ active: pathname === item.to })} to={item.to} key={item.to}>{item.label}</Link>)}
                </div>}
                {children}
            </Content>
        </Layout>
    </Layout>
}

XMaster.propTypes = {
    children: PropTypes.any
};

export default connect(
    ({ browser }) => ({ height: browser.height })
)(XMaster);