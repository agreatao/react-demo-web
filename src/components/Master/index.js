import { Icon, Layout, Menu } from "antd";
import classnames from "classnames";
import { connect } from "dva";
import { Link } from "dva/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "./index.less";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const MENU = [
    {
        label: "患者信息管理",
        key: "sickInfo",
        icon: <Icon type="team" />
    },
    {
        label: "检查管理",
        key: "check",
        icon: <Icon type="solution" />,
        children: [
            {
                label: "常规检查",
                key: "sickNormalCheck"
            },
            {
                label: "特征检查",
                key: "sickSpecialCheck"
            }
        ]
    },
    {
        label: "收费管理",
        key: "payments",
        icon: <Icon type="pay-circle" />,
        children: [
            {
                label: "通知单管理",
                key: "chargeNotice"
            },
            {
                label: "收费项目管理",
                key: "checkType"
            }
        ]
    }
]

function getOpenKey(key) {
    let openKey = null;
    for (let i = 0; i < MENU.length; i++) {
        if (MENU[i].children) {
            for (let j = 0; j < MENU[i].children.length; j++) {
                if (MENU[i].children[j].key === key) {
                    openKey = MENU[i].key;
                    break;
                }
            }
        }
    }
    return openKey;
}

const XMaster = ({ children, height, routes }) => {
    const [collapsed, setCollapsed] = useState(false);
    let pathname = window.location.hash;
    pathname = pathname.replace("#", "");

    function handleClick(e) {
        window.location.href = `${CONFIG.baseURL}/${e.key}`;
    }

    let path = window.location.pathname,
        selectedKey = path.replace(`${CONFIG.baseURL}/`, ""),
        openKey = getOpenKey(selectedKey);

    return <Layout className="x-master">
        <Header className="x-master-header">
            <div className="logo"></div>
        </Header>
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                <Menu
                    defaultOpenKeys={[openKey]}
                    defaultSelectedKeys={[selectedKey]}
                    onClick={handleClick}
                    style={{ height: height - 50 }}
                    className="x-master-nav" theme="dark" mode="inline">
                    {MENU.map(item => item.children ?
                        <SubMenu key={item.key} title={<span>{item.icon}<span>{item.label}</span></span>}>
                            {item.children.map(subItem => <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>)}
                        </SubMenu>
                        :
                        <Menu.Item key={item.key}>{item.icon}<span>{item.label}</span></Menu.Item>
                    )}
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