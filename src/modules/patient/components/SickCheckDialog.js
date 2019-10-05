import { connect } from "dva";
import { Tabs, Modal } from "antd";
import React from "react";
import Table from "components/Table";

const NormalCheckTable = connect(
    ({ normalCheck }) => ({ ...normalCheck })
)(({ list, page, total }) => {
    return <Table
        {...{ list, total, page }}
        columns={[
            { title: "检查时间", dataIndex: "inspectDate" },
            { title: "检查医生 / 护士", dataIndex: "opsDoctor" }
        ]}
        operations={(id, row) => <a onClick={() => console.log(row)}>明细</a>}
    />
})

function SickCheckDialog({ dispatch, visible }) {
    return <Modal width={800} visible={visible} footer={null} onCancel={() => dispatch({ type: "patient/toggleCheckDialog", checkDialogVisible: false })}>
        <Tabs>
            <Tabs.TabPane tab="特殊检查" key="specialCheck">
                <NormalCheckTable />
            </Tabs.TabPane>
            <Tabs.TabPane tab="常规检查" key="normalCheck">

            </Tabs.TabPane>
        </Tabs>
    </Modal>
}


export default connect(
    ({ patient }) => ({
        visible: patient.checkDialogVisible
    })
)(SickCheckDialog);