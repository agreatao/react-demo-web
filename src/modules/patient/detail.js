import React from "react";
import { connect } from "react-redux";

import { Icon, Tabs } from "antd";

import BaseInfo from "./detailBaseinfo";
import History from "./detailHistory";
import NormalCheck from "./detailNormalCheck";
import SpecialCheck from "./detailSpecialCheck";

const { TabPane } = Tabs;

export default connect()(
    class extends React.Component {
        render() {
            const { onClose, data } = this.props;
            return (
                <div className="patient-detail">
                    <header>
                        <h4>患者详情</h4>
                        <a className="close-btn" onClick={onClose}>
                            <Icon type="close" />
                        </a>
                    </header>
                    <Tabs type="card">
                        <TabPane tab="基本信息" key="1">
                            <BaseInfo data={data} />
                        </TabPane>
                        <TabPane tab="既往病史" key="2">
                            <History dataKey={data.sickId} />
                        </TabPane>
                        <TabPane tab="常规检查" key="3">
                            <NormalCheck dataKey={data.sickId} />
                        </TabPane>
                        <TabPane tab="特检" key="4">
                            <SpecialCheck dataKey={data.sickId} />
                        </TabPane>
                    </Tabs>
                </div>
            );
        }
    }
);
