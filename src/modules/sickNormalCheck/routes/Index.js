import Control from "components/Control";
import { createNormalCheckDialog } from "components/Dialog/templates";
import { SickInfoFilter } from "components/Filter";
import Table from "components/Table";
import { connect } from "dva";
import React from "react";
import NewNormalCheckDialog from "../components/NewNormalCheckDialog";

function Index({ height, loading, total, list, page, dispatch }) {
    return <div className="sick-normal-check">
        <Control
            onAdd={() => dispatch({ type: "sickNormalCheck/showNewNormalCheck" })}
            onDelete={() => console.log("delete")}
            filter={<SickInfoFilter onFilter={filter => dispatch({ type: "sickNormalCheck/filterChange", filter })} />}
        />
        <Table
            columns={[
                { title: '病历号', dataIndex: 'sickInfo.sickId', width: 200 },
                { title: '姓名', dataIndex: 'sickInfo.sickName', width: 140 },
                { title: '性别', dataIndex: 'sickInfo.sickSex', width: 120, render: sex => sex == 1 ? "男" : "女" },
                { title: '年龄', dataIndex: 'sickInfo.sickAge', width: 120 },
                { title: '检查时间', dataIndex: 'inspectDate', width: 180 }
            ]}
            operations={(id, row, index) => <a onClick={() => createNormalCheckDialog(row)}>明细</a>}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "sickNormalCheck/pageChange", page: { currentPage, pageSize } })}
            onDelete={(id) => dispatch({ type: "sickNormalCheck/remove", ids: [id] })}
        />
        <NewNormalCheckDialog />
    </div>
}

export default connect(
    ({ browser, sickNormalCheck, control, loading }) => ({
        height: browser.height - control.height - 95,
        loading: loading.effects["sickNormalCheck/search"],
        total: sickNormalCheck.total,
        list: sickNormalCheck.list,
        page: sickNormalCheck.page
    })
)(Index);