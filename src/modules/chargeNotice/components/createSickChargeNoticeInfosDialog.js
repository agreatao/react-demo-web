import { createXDialog } from "components/Dialog";
import Table from "components/table";
import React from "react";

function SickChargeNoticeInfoTable({ list }) {
    return <Table
        columns={[
            { title: "项目名称", dataIndex: "chargeName" },
            { title: "单位", dataIndex: "chargeUnit" },
            { title: "项目金额", dataIndex: "chargeAmount" }
        ]}
        list={list}
    />
}

export default function createSickInfoDialog(list) {
    createXDialog({
        width: 800,
        children: ({ close }) => <SickChargeNoticeInfoTable list={list} />
    })
}