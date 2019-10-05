import { connect } from "dva";
import { Tabs, Modal } from "antd";
import React from "react";

function SickCheckDialog({ dispatch, visible }) {
    return <Modal width={800} visible={visible} footer={null} onCancel={() => dispatch({ type: "patient/toggleCheckDialog", checkDialogVisible: false })}>
        <Tabs>
            <Tabs.TabPane tab="特殊检查" key="specialCheck">

            </Tabs.TabPane>
            <Tabs.TabPane tab="常规检查" key="normalCheck">

            </Tabs.TabPane>
        </Tabs>
    </Modal>
}


export default connect(
    ({ patient, normalCheck, specialCheck }) => ({
        visible: patient.checkDialogVisible
    })
)(SickCheckDialog);