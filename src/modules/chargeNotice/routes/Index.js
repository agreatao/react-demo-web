import Control from "components/Control";
import Table from "components/Table";
import { connect } from "dva";
import React from "react";
import ChargeNoticeFilter from "../components/ChargeNoticeFilter";
import createSickChargeNoticeInfosDialog from "../components/createSickChargeNoticeInfosDialog";

function Index({ height, loading, total, list, page, dispatch }) {
    return <div className="charge-notice">
        <Control
            onAdd={() => console.log("add")}
            onDelete={() => console.log("delete")}
            filter={<ChargeNoticeFilter onFilter={filter => dispatch({ type: "chargeNotice/filterChange", filter })} />}
        />
        <Table
            columns={[
                { title: "患者姓名", dataIndex: "sickName", width: 140 },
                { title: '开票时间', dataIndex: 'billingDate', width: 400 },
                { title: '开票人', dataIndex: 'billingPerson', width: 140 },
                {
                    title: '总金额（元）', dataIndex: 'sickChargeNoticeInfos', width: 120, render: (infos) => {
                        let total = 0;
                        infos && infos.forEach(item => { total += item.chargeAmount })
                        return total;
                    }
                },
            ]}
            operations={(id, row, index) => <a onClick={() => createSickChargeNoticeInfosDialog(row.sickChargeNoticeInfos)}>项目明细</a>}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "chargeNotice/pageChange", page: { currentPage, pageSize } })}
            onDelete={id => dispatch({ type: "chargeNotice/remove", ids: [id] })}
        />
    </div>
}

export default connect(
    ({ browser, chargeNotice, control, loading }) => ({
        height: browser.height - control.height - 95,
        loading: loading.effects["chargeNotice/search"],
        total: chargeNotice.total,
        list: chargeNotice.list,
        page: chargeNotice.page
    })
)(Index);