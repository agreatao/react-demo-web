import Control from "components/Control";
import { SickInfoFilter } from "components/Filter";
import Table from "components/Table";
import { connect } from "dva";
import React from "react";
import createSickHistoryDialog from "../components/createSickHistoryDialog";
import createSickInfoDialog from "../components/createSickInfoDialog";
import SickCheckDialog from "../components/SickCHeckDialog";

function Index({ height, loading, total, list, page, dispatch }) {
    return <div className="sick-info">
        <Control
            onAdd={() => createSickInfoDialog().then(sickInfo => dispatch({ type: "sickInfo/saveOrUpdate", sickInfo }))}
            onDelete={() => console.log("delete")}
            filter={<SickInfoFilter onFilter={filter => dispatch({ type: "sickInfo/filterChange", filter })} />}
        />
        <Table
            columns={[
                { title: '病历号', dataIndex: 'sickId', width: 200 },
                { title: '姓名', dataIndex: 'sickName', width: 140 },
                { title: '性别', dataIndex: 'sickSex', width: 120, render: sex => sex == 1 ? "男" : "女" },
                { title: '年龄', dataIndex: 'sickAge', width: 120 },
                { title: '联系方式', dataIndex: 'mobilePhone', width: 180 }
            ]}
            operations={(id, row, index) => <React.Fragment>
                <a onClick={() => dispatch({ type: "sickInfo/showCheck", filter: { sickInfoId: id } })}>查看检查记录</a>
                <a onClick={() => createSickHistoryDialog(row).then(sickHistory => dispatch({ type: "sickHistory/saveOrUpdate", sickHistory }))}>查看病史</a>
            </React.Fragment>}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "sickInfo/pageChange", page: { currentPage, pageSize } })}
            onDelete={(id) => dispatch({ type: "sickInfo/remove", ids: [id] })}
            onEdit={(data) => createSickInfoDialog(data).then(sickInfo => dispatch({ type: "sickInfo/saveOrUpdate", sickInfo }))}
        />
        <SickCheckDialog />
    </div>
}

export default connect(
    ({ browser, sickInfo, control, loading }) => ({
        height: browser.height - control.height - 95,
        loading: loading.effects["sickInfo/search"],
        total: sickInfo.total,
        list: sickInfo.list,
        page: sickInfo.page
    })
)(Index);