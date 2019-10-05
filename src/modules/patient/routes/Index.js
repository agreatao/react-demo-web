import Control from "components/Control";
import Table from "components/Table";
import { connect } from "dva";
import React from "react";
import createSickHistoryDialog from "../components/createSickHistoryDialog";
import createSickInfoDialog from "../components/createSickInfoDialog";
import SickCheckDialog from "../components/SickCHeckDialog";
import { PatientFilter } from "../components/Filter";

function Index({ height, loading, total, list, page, dispatch }) {
    return <div className="patient">
        <Control
            onAdd={() => createSickInfoDialog()}
            onDelete={() => console.log("delete")}
            filter={<PatientFilter onFilter={filter => dispatch({ type: "patient/filterChange", filter })} />}
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
                <a onClick={() => dispatch({ type: "patient/showCheck", filter: { sickInfoId: id } })}>查看检查记录</a>
                <a onClick={() => createSickHistoryDialog(row)}>查看病史</a>
            </React.Fragment>}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "patient/pageChange", page: { currentPage, pageSize } })}
            onDelete={(id) => dispatch({ type: "patient/remove", ids: [id] })}
            onEdit={(data) => createSickInfoDialog(data)}
        />
        <SickCheckDialog />
    </div>
}

export default connect(
    ({ browser, patient, control, loading }) => ({
        height: browser.height - control.height - 95,
        loading: loading.effects["patient/search"],
        total: patient.total,
        list: patient.list,
        page: patient.page
    })
)(Index);