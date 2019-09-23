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
import { addOrEdit } from "./dialog";

const Page = connect(state => ({ browser: state.browser, bars: state.bars }))(
    class Page extends React.Component {
        state = {
            currentPage: 1,
            pageSize: 10,
            loading: false,

            tableData: null,
            total: 0
        };
        params = {
            sickName: null
        };
        fetch() {
            const { currentPage, pageSize } = this.state;
            this.setState({ loading: true }, () => {
                http.post("/payments/getChargeNoticeList", this.params, { params: { currentPage, pageSize } })
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
        handleAdd = e => {
            e.preventDefault();
            addOrEdit().then(this.fetch);
        };
        handleEdit = (data, e) => {
            e.preventDefault();
            addOrEdit(data).then(this.fetch);
        };
        render() {
            const { browser, bars } = this.props;
            const { currentPage, pageSize, tableData, total, loading } = this.state;
            return (
                <Master activePage="paymentNotices" activeSubmenu="payment">
                    <Bars
                        left={
                            <React.Fragment>
                                <a onClick={this.handleAdd}><Icon type="plus" />新增</a>
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
                                title: "姓名",
                                dataIndex: "sickName",
                                width: 150
                            },
                            {
                                title: "开票时间",
                                dataIndex: "billingDate",
                                width: 100
                            },
                            {
                                title: "开票人",
                                dataIndex: "billingPerson",
                                width: 200
                            },
                            {
                                title: "操作",
                                className: "actions",
                                dataIndex: "id",
                                width: 100,
                                render: (id, row) => <React.Fragment>
                                    <a onClick={e => this.handleEdit(row, e)}>查看</a>
                                </React.Fragment>
                            }
                        ]}
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
    }
)

entry(<Page />);
