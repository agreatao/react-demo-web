import { Icon } from "antd";
import { remove } from "components/alert";
import Bars from "components/bars";
import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import http from "utils/http";
import Filter from "./filter";
import form from "./form";

export default connect(state => ({ browser: state.browser, bars: state.bars }))(
    class Content extends React.Component {
        state = {
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            loading: false,

            tableData: null,
            total: 0
        };
        params = {
            nickName: null,
            telephone: null,
            roleId: null,
            status: null
        };
        fetch() {
            const { currentPage, pageSize } = this.state;
            this.setState({ loading: true }, () => {
                http.post("/user/getUserInfoList", this.params, { params: { currentPage, pageSize } })
                    .then(data => {
                        this.setState({
                            loading: false,
                            tableData: data.result,
                            total: data.total
                        });
                    });
            });
        }
        componentDidMount() {
            this.fetch();
        }
        handleFilter = params => {
            this.params = params;
            this.fetch();
        };
        handlePageChange = currentPage => {
            this.setState({ currentPage }, () => {
                this.fetch();
            });
        };
        handleEdit = (data, e) => {
            e.preventDefault();
            form(data).then(() => {
                this.fetch();
            });
        };
        handleRowSelect = selectedIds => {
            this.setState({ selectedIds });
        };
        handleDelete = (ids, e) => {
            e && e.preventDefault();
            if (ids && ids.length > 0)
                remove()
                    .then(() => {
                        http.get("/user/deleteUserInfo", { params: { ids: ids.join(",") } }).then(() => {
                            let { total, currentPage, pageSize } = this.state;
                            currentPage = Math.min(currentPage, Math.ceil((total - 1) / pageSize));
                            this.setState({ currentPage }, () => {
                                this.fetch();
                            });
                        })
                    })
        };
        render() {
            const { browser, bars } = this.props;
            const { currentPage, pageSize, tableData, total, selectedIds, loading } = this.state;
            return (
                <div>
                    <Bars
                        left={
                            <a onClick={e => this.handleDelete(this.state.selectedIds, e)}><Icon type="delete" />批量删除</a>
                        }>
                        <Filter onFilter={this.handleFilter} />
                    </Bars>
                    <Table
                        style={{ height: browser.height - bars.height - 100 }}
                        columns={[
                            {
                                title: "姓名",
                                dataIndex: "nickName",
                            },
                            {
                                title: "手机号码",
                                dataIndex: "telephone",
                            },
                            {
                                title: "职位",
                                dataIndex: "roleId",
                                render: roleId =>
                                    roleId == 1
                                        ? "管理员"
                                        : roleId == 2
                                            ? "医生"
                                            : "护士"
                            },
                            {
                                title: "操作",
                                className: "actions",
                                dataIndex: "id",
                                render: (id, row) => <React.Fragment>
                                    <a onClick={e => this.handleEdit(row, e)}>修改</a>
                                    <a onClick={e => this.handleDelete([id], e)}>删除</a>
                                </React.Fragment>
                            }
                        ]}
                        rowSelection={{
                            selectedRowKeys: selectedIds,
                            onChange: this.handleRowSelect
                        }}
                        rowKey="id"
                        dataSource={tableData}
                        loading={loading}
                    />
                    <Pagination
                        pageNo={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            );
        }
    }
);