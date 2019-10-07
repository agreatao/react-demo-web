import Control from "components/Control";
import CheckTypeFilter from "../components/CheckTypeFilter";
import Table from "components/Table";
import { connect } from "dva";
import React from "react";

function Index({ height, loading, total, list, page, dispatch }) {
    return <div className="check-type">
        <Control
            onAdd={() => console.log("add")}
            onDelete={() => console.log("delete")}
            filter={<CheckTypeFilter onFilter={filter => dispatch({ type: "checkType/filterChange", filter })} />}
        />
        <Table
            columns={[
                { title: '项目名称', dataIndex: 'checkTypeName', width: 400 },
                { title: '单位', dataIndex: 'unit', width: 140 },
                { title: '金额', dataIndex: 'amount', width: 120 },
            ]}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "checkType/pageChange", page: { currentPage, pageSize } })}
            onEdit={row => console.log(row)}
            onDelete={id => dispatch({ type: "checkType/remove", ids: [id] })}
        />
    </div>
}

export default connect(
    ({ browser, checkType, control, loading }) => ({
        height: browser.height - control.height - 95,
        loading: loading.effects["checkType/search"],
        total: checkType.total,
        list: checkType.list,
        page: checkType.page
    })
)(Index);