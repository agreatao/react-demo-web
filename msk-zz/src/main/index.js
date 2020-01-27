import { Col, Drawer, Icon, Menu, Row } from 'antd';
import Tips from 'components/Tips';
import VersionAndLocale from 'components/VersionAndLocale';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './index.less';

export default connect(
    ({ routes }) => ({ routes })
)(
    function Main({ routes }) {
        const [visible, setVisible] = useState(false);

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
                            <VersionAndLocale onChange={() => setVisible(false)} />
                        </div>
                        <Menu mode="inline">
                            {routes && routes.map(item => <Menu.Item key={item.path}>{item.name}</Menu.Item>)}
                        </Menu>
                    </Drawer>
                    <Row gutter={0}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                            <div className="logo">ZZ Formula</div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={20} xl={20} xxl={20}>
                            <VersionAndLocale onChange={() => setVisible(false)} />
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="content">
                <Row gutter={0}>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}>
                        <Menu mode="inline">
                            {routes && routes.map(item => <Menu.Item key={item.path}>{item.name}</Menu.Item>)}
                        </Menu>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                        <Tips />
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    }
)