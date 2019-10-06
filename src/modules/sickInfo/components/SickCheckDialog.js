import { Modal, Tabs } from "antd";
import { createNormalCheckDialog } from "components/Dialog/templates";
import Table from "components/Table";
import { connect } from "dva";
import React from "react";

const NormalCheckTable = connect(
    ({ sickNormalCheck }) => ({ ...sickNormalCheck })
)(({ dispatch, list, page, total }) => {
    return <Table
        columns={[
            { title: "检查时间", dataIndex: "inspectDate" },
            { title: "检查医生 / 护士", dataIndex: "opsDoctor" }
        ]}
        operations={(id, row, index) => <a onClick={() => createNormalCheckDialog(row)}>明细</a>}
        style={{ height: 400 }}
        list={list}
        total={total}
        currentPage={page.currentPage}
        pageSize={page.pageSize}
        onPageChange={(currentPage, pageSize) => dispatch({ type: "sickNormalCheck/pageChange", page: { currentPage, pageSize } })}
    />
})

const SpecialCheckTable = connect(
    ({ sickSpecialCheck }) => ({ ...sickSpecialCheck })
)(({ dispatch, list, page, total }) => {
    return <Table
        columns={[
            { title: "检查项目", dataIndex: "" },
            { title: "检查时间", dataIndex: "inspectDate" },
            { title: "检查医生 / 护士", dataIndex: "opsDoctor" }
        ]}
        operations={(id, row, index) => <a onClick={() => console.log(row)}>明细</a>}
        style={{ height: 400 }}
        list={list}
        total={total}
        currentPage={page.currentPage}
        pageSize={page.pageSize}
        onPageChange={(currentPage, pageSize) => dispatch({ type: "sickSpecialCheck/pageChange", page: { currentPage, pageSize } })}
    />
})

function SickCheckDialog({ dispatch, visible }) {
    return <Modal maskClosable={false} centered width={800} visible={visible} footer={null} onCancel={() => dispatch({ type: "sickInfo/toggleCheckDialog", checkDialogVisible: false })}>
        <Tabs>
            <Tabs.TabPane tab="常规检查" key="normalCheck">
                <NormalCheckTable />
            </Tabs.TabPane>
            <Tabs.TabPane tab="特殊检查" key="specialCheck">
                <SpecialCheckTable />
            </Tabs.TabPane>

        </Tabs>
    </Modal>
}

export default connect(
    ({ sickInfo }) => ({
        visible: sickInfo.checkDialogVisible
    })
)(SickCheckDialog);