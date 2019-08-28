import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default class PatientCard extends React.Component {
    render() {
        return (
            <div className="patient-card">
                <div className="patient-info">
                    <label>当前病人：</label>
                    <h2>张君</h2>
                    <p>
                        <span>26岁</span>
                        <span>男</span>
                    </p>
                </div>
                <Tabs type="card">
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
