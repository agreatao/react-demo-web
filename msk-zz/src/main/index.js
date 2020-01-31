import { Col, Drawer, Icon, Row } from 'antd';
import Caculate from 'components/Caculate';
import Nav from 'components/Nav';
import Tips from 'components/Tips';
import VersionAndLocale from 'components/VersionAndLocale';
import React, { useState } from 'react';
import './index.less';

export default function Main() {
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
                    className='nav-drawer'
                    visible={visible}
                    onClose={() => setVisible(false)}
                >
                    <div className='clearfix'>
                        <VersionAndLocale onChange={() => setVisible(false)} />
                    </div>
                    <Nav onChange={() => setVisible(false)} />
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
                    <Nav onChange={() => setVisible(false)} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                    <Tips />
                    <Caculate />
                </Col>
            </Row>
        </div>
    </React.Fragment>
}