import { Icon } from "antd";
import Master from "commons/master";
import { remove } from "components/alert";
import Bars from "components/bars";
import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import entry from "utils/entry";
import http from "utils/http";
import Filter from "./filter";
import viewDetail from "./viewDetail";
import "./style";

const Page = connect(
    state => ({ browser: state.browser, bars: state.bars })
)(
    class Page extends React.Component {
        state = {
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            loading: false,

            tableData: null,
            total: 0
        }
        params = {
            startTime: null,
            endTime: null,
            sickName: null,
            mobilePhone: null,
            operation: null
        }
        fetch() {
            const { currentPage, pageSize } = this.state;
            this.setState({ loading: true }, () => {
                http.post("/sick/getSickInfoList", this.params, { params: { currentPage, pageSize } }).then(data => {
                    this.setState({
                        loading: false,
                        tableData: data.result,
                        total: data.total
                    });
                }).catch(e => { })
            })
        }
        componentDidMount() {
            this.fetch();
        }
        handleFilter = params => {
            this.params = params;
            this.fetch();
        }
        handlePageChange = (currentPage) => {
            this.setState({ currentPage }, () => {
                this.fetch();
            });
        }
        handleRowClick(record, e) {
            e.preventDefault();
            const { onRowSelect } = this.props;
            onRowSelect && onRowSelect(record);
        }
        handleAdd = e => {
            e.preventDefault();
        }
        handleViewDetail = (data, e) => {
            e.preventDefault();
            viewDetail(data.id);
        }
        handleRowSelect = (selectedIds) => {
            this.setState({ selectedIds })
        }
        handleDelete = (ids, e) => {
            e.preventDefault();
            if (ids && ids.length > 0)
                remove()
                    .then(() => {
                        http.get("/sick/deleteSickInfo", { params: { ids: ids.join(",") } })
                            .then(() => {
                                let { total, currentPage, pageSize } = this.state;
                                currentPage = Math.min(currentPage, Math.ceil((total - 1) / pageSize));
                                this.setState({ currentPage }, () => {
                                    this.fetch();
                                })
                            })
                    })
        }
        render() {
            const { browser, bars } = this.props;
            const { currentPage, pageSize, loading, tableData, total, selectedIds } = this.state;
            return (
                <Master activePage="patient">
                    <Bars
                        left={
                            <React.Fragment>
                                <a onClick={this.handleAdd}><Icon type="plus" />新增</a>
                                <a onClick={e => this.handleDelete(this.state.selectedIds, e)}><Icon type="delete" />删除</a>
                            </React.Fragment>
                        }>
                        <Filter onFilter={this.handleFilter} />
                    </Bars>
                    <Table
                        style={{ height: browser.height - bars.height - 100 }}
                        scroll={{
                            y: browser.height - bars.height - 155,
                            x: browser.width - 200
                        }}
                        columns={[
                            {
                                title: '病历号',
                                dataIndex: 'sickId'
                            },
                            {
                                title: '姓名',
                                dataIndex: 'sickName'
                            },
                            {
                                title: '性别',
                                dataIndex: 'sickSex'
                            },
                            {
                                title: '年龄',
                                dataIndex: 'sickAge'
                            },
                            {
                                title: '联系方式',
                                dataIndex: 'mobilePhone'
                            },
                            {
                                title: "操作",
                                className: "actions",
                                dataIndex: "id",
                                render: (id, row) => <React.Fragment>
                                    <a onClick={e => this.handleViewDetail(row, e)}>查看详情</a>
                                    <a onClick={e => this.handleDelete([id], e)}>删除</a>
                                </React.Fragment>
                            }
                        ]}
                        rowSelection={{
                            selectedRowKeys: selectedIds,
                            onChange: this.handleRowSelect,
                            onSelect: (record, selected, selectedRows, e) => e.stopPropagation()
                        }}
                        onRow={record => ({
                            onClick: e => this.handleRowClick(record, e)
                        })}
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
                </Master>
            );
        }
    })

entry(<Page />);
