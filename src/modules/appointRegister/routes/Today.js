import React from "react";
import { connect } from "dva";
import Table from "components/Table";
import Control from "components/Control";
import createRegisterDialog from "../components/createRegisterDialog";
import createCallOutDialog from "../components/createCallOutDialog";
import { TodayFilter } from "../components/Filter";

function Today({ height, loading, total, list, page, dispatch }) {
    return <div className="appoint-register-today">
        <Control
            onAdd={() => createRegisterDialog()}
            onDelete={() => console.log("delete")}
            filter={<TodayFilter onFilter={filter => dispatch({ type: "today/filterChange", filter })} />}
        />
        <Table
            columns={[
                { title: "姓名", dataIndex: "name", width: 140 },
                { title: "电话号码", dataIndex: "phone", width: 180 },
                { title: "预约时间", dataIndex: "appointDate", width: 300, render: () => "2019-10-20 下午（1:00 - 5:00）" },
                { title: "预约医生", dataIndex: "doctorName", width: 140 }
            ]}
            operations={{
                others: (id, row, index) => <React.Fragment>
                    <a onClick={() => createCallOutDialog(row)}>叫号</a>
                </React.Fragment>
            }}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "today/pageChange", page: { currentPage, pageSize } })}
            onDelete={(id) => dispatch({ type: "today/remove", ids: [id] })}
            onEdit={(data) => createRegisterDialog(data)}
        />
    </div>
}

export default connect(
    ({ browser, today, control, loading }) => ({
        height: browser.height - control.height - 140,
        loading: loading.effects["today/search"],
        total: today.total,
        list: today.list,
        page: today.page
    })
)(Today)
