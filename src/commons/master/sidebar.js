import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

export default connect(state => ({ browser: state.browser }))(
    class Sidebar extends React.Component {
        handleClick({ key }) {
            if (window.location.href.indexOf(key) > -1) return;
            window.location.href = CONFIG.baseURL + "/" + key;
        }
        render() {
            const { height } = this.props.browser;
            const { activePage, activeSubmenu } = this.props;
            return (
                <div className="sidebar" style={{ height: height - 50 }}>
                    <Menu onClick={this.handleClick} defaultSelectedKeys={[activePage]} defaultOpenKeys={[activeSubmenu]} mode="inline">
                        <Menu.Item key="patient">
                            <Icon type="user" />
                            <span>患者信息管理</span>
                        </Menu.Item>
                        <SubMenu
                            key="appointment"
                            title={
                                <span>
                                    <Icon type="clock-circle" />
                                    <span>预约管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="operationcheckAppointment">术前检查预约</Menu.Item>
                            <Menu.Item key="operationAppointment">手术预约</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="medicine">
                            <Icon type="medicine-box" />
                            <span>药品管理</span>
                        </Menu.Item>
                        <Menu.Item key="doctor">
                            <Icon type="team" />
                            <span>医生管理</span>
                        </Menu.Item>
                    </Menu>
                </div>
            );
        }
    }
);
