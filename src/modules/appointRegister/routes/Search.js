import Table from "components/Table";
import { connect } from "dva";
import React from "react";
import { SearchFilter } from "../components/Filter";

function Search({ height, loading, total, list, page, dispatch }) {
    return <div className="appoint-register-search">
        <SearchFilter onFilter={filter => dispatch({ type: "search/filterChange", filter })} />
        <Table
            columns={[
                { title: "姓名", dataIndex: "name", width: 140 },
                { title: "电话号码", dataIndex: "phone", width: 180 },
                { title: "预约时间", dataIndex: "appointDate", width: 300, render: () => "2019-10-20 下午（1:00 - 5:00）" },
                { title: "预约医生", dataIndex: "doctorName", width: 140 }
            ]}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "search/pageChange", page: { currentPage, pageSize } })}
            onDelete={(id) => dispatch({ type: "search/remove", ids: [id] })}
        />
    </div>
}

export default connect(
    ({ browser, search, loading }) => ({
        height: browser.height - 220,
        loading: loading.effects["search/search"],
        total: search.total,
        list: search.list,
        page: search.page
    })
)(Search)
