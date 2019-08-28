import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import http from "utils/http";
import { columns } from "../config/search";
import Filter from "../filter/search";

export default connect(state => ({ browser: state.browser }))(
    class Search extends React.Component {
        state = {
            currentPage: 1,
            pageSize: 10,
            tableData: null,
            total: 0,
            loading: true
        };
        params = {
            name: null,
            phone: null,
            startDate: null,
            endDate: null,
            appointTime: null
        };
        fetch = () => {
            const { currentPage, pageSize } = this.state;
            this.setState({ loading: true }, () => {
                http.post("/appoint/appointRegisterSearch", this.params, { params: { currentPage, pageSize } })
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
        handleReAppoint = (patient, e) => {
            e.preventDefault();
        };
        render() {
            const { browser } = this.props;
            const { currentPage, pageSize, tableData, total, loading } = this.state;
            return (
                <React.Fragment>
                    <div className="filter-container">
                        <Filter onFilter={this.handleFilter} />
                    </div>
                    <Table
                        style={{ height: browser.height - 241 }}
                        columns={columns({
                            onReAppoint: this.handleReAppoint
                        })}
                        dataSource={tableData}
                        loading={loading}
                    />
                    <Pagination pageNo={currentPage} pageSize={pageSize} total={total} onPageChange={this.handlePageChagne} />
                </React.Fragment>
            );
        }
    }
);
