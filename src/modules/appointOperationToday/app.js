import { Icon, Menu } from "antd";
import Master from "commons/master";
import { confirm } from "components/alert";
import Bars from "components/bars";
import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import entry from "utils/entry";
import http from "utils/http";
import { columns } from "./config";
import { addOrEdit } from "./dialog";
import Filter from "./filter";

const Page = connect(state => ({ browser: state.browser, bars: state.bars }))(
    class Page extends React.Component {
        state = {
            currentPage: 1,
            pageSize: 10,
            tableData: null,
            total: 0,
            loading: true
        };
        params = {
            name: null,
            phone: null
        };
        fetch = () => {
            const { currentPage, pageSize } = this.state;
            this.setState({ loading: true }, () => {
                http.post("/appoint/appointOperationSearch", this.params, { params: { currentPage, pageSize } })
                    .then(data => {
                        this.setState({
                            tableData: data.result,
                            total: data.total,
                            loading: false
                        });
                    })
                    .catch(e => {
                        this.setState({ loading: false, tableData: Array.from({ length: 10 }, (item, i) => ({ id: i })), total: 0 });
                    });
            });
        };
        handleFilter = params => {
            this.params = params;
            this.fetch();
        };
        handlePageChagne = currentPage => {
            this.setState({ currentPage }, this.fetch);
        };
        componentDidMount() {
            this.fetch();
        }
        handleAdd = e => {
            e.preventDefault();
            addOrEdit().then(this.fetch);
        };
        handleUpdate = (patient, e) => {
            e.preventDefault();
            addOrEdit(patient).then(this.fetch);
        };
        handleCancel = (patient, e) => {
            e.preventDefault();
            confirm("确定要取消预约吗？")
                .then(() => {})
                .catch(() => {});
        };
        render() {
            const { browser, bars } = this.props;
            const { currentPage, pageSize, tableData, total, loading } = this.state;
            return (
                <Master activePage="appointOperation" activeSubmenu="appoint">
                    <Menu mode="horizontal" selectedKeys={["today"]}>
                        <Menu.Item key="today">今日预约</Menu.Item>
                        <Menu.Item key="search">
                            <a href={`${CONFIG.baseURL}/appointOperation/search`}>预约查询</a>
                        </Menu.Item>
                    </Menu>
                    <Bars
                        left={[
                            <a onClick={this.handleAdd} key="add">
                                <Icon type="plus" />
                                新增手术预约
                            </a>
                        ]}
                    >
                        <Filter onSubmit={this.handleFilter} />
                    </Bars>
                    <Table
                        style={{ height: browser.height - bars.height - 150 }}
                        columns={columns({
                            onUpdate: this.handleUpdate,
                            onCancel: this.handleCancel
                        })}
                        dataSource={tableData}
                        loading={loading}
                    />
                    <Pagination pageNo={currentPage} pageSize={pageSize} total={total} onPageChange={this.handlePageChagne} />
                </Master>
            );
        }
    }
);

entry(<Page />);
