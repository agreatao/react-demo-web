import { Button, Col, Form, Icon, Input, Row } from "antd";
import { remove } from "components/alert";
import Bars from "components/bars";
import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import http from "utils/http";
import medicineFormModal from "./formModal";

export default connect(state => ({ browser: state.browser, bars: state.bars }))(
    class extends React.Component {
        state = {
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            loading: false,

            tableData: null,
            total: 0
        }

        params = {
            drugName: null
        }
        fetch() {
            const { currentPage, pageSize } = this.state;
            const params = this.params;
            this.setState({ loading: true }, () => {
                http.post("/drug/queryDrugInfoList", params, {
                    params: {
                        currentPage, pageSize
                    }
                }).then(
                    data => {
                        this.setState({
                            loading: false,
                            tableData: data.result,
                            total: data.total
                        });
                    }
                );
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
            })
        }
        handleAdd = e => {
            e.preventDefault();
            medicineFormModal()
                .then(isUpdate => { isUpdate && this.fetch() })
                .catch(() => { });
        };
        handleEdit = (data, e) => {
            e.preventDefault();
            medicineFormModal(data)
                .then(isUpdate => { isUpdate && this.fetch() })
                .catch(() => { });
        };
        handleRowSelect = (selectedIds) => {
            this.setState({ selectedIds })
        }
        handleDelete = (ids, e) => {
            e && e.preventDefault();
            if (ids && ids.length > 0)
                remove()
                    .then(() => {
                        http.get("/drug/deleteDrugInfo", { params: { ids: ids.join(",") } }).then(() => {
                            let { total, currentPage, pageSize } = this.state;
                            currentPage = Math.min(currentPage, Math.ceil((total - 1) / pageSize));
                            this.setState({ currentPage }, () => {
                                this.fetch();
                            })
                        }).catch(e => { });
                    })
                    .catch(() => { });
        };
        render() {
            const { browser, bars } = this.props;
            const { currentPage, pageSize, tableData, total, selectedIds, loading } = this.state;
            return (
                <div className="medicine-content">
                    <Bars
                        left={
                            <React.Fragment>
                                <a onClick={this.handleAdd}>
                                    <Icon type="plus" />
                                    新增药品
                                </a>
                                <a onClick={e => this.handleDelete(this.state.selectedIds, e)}>
                                    <Icon type="delete" />
                                    删除
                                </a>
                            </React.Fragment>
                        }
                    >
                        <Filter onFilter={this.handleFilter} />
                    </Bars>
                    <Table
                        rowKey="id"
                        loading={loading}
                        style={{ height: browser.height - bars.height - 100 }}
                        scroll={{ y: browser.height - bars.height - 155, x: 1500 }}
                        columns={[
                            {
                                title: "药品名称",
                                dataIndex: "drugName",
                                width: 150
                            },
                            {
                                title: "规格",
                                dataIndex: "norms",
                                width: 100
                            },
                            {
                                title: "形状",
                                dataIndex: "drugShape",
                                width: 200
                            },
                            {
                                title: "适应症",
                                dataIndex: "suitType",
                            },
                            {
                                title: "成份",
                                dataIndex: "composition",
                                width: 325
                            },
                            {
                                title: "操作",
                                className: "actions",
                                dataIndex: "id",
                                width: 100,
                                render: (id, row) => (
                                    <React.Fragment>
                                        <a onClick={e => this.handleEdit(row, e)}>修改</a>
                                        <a onClick={e => this.handleDelete([id], e)}>删除</a>
                                    </React.Fragment>
                                )
                            }
                        ]}
                        dataSource={tableData}
                        rowSelection={{
                            selectedRowKeys: selectedIds,
                            onChange: this.handleRowSelect
                        }}
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

const Filter = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                this.props.onFilter && this.props.onFilter(values)
            })
        }
        handleReset = () => {
            this.props.form.resetFields();
            this.props.onFilter && this.props.onFilter({
                drugName: null
            })
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="medicine-filter" layout="inline" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={18}>
                            <Form.Item label="药品名称">
                                {getFieldDecorator("drugName")(<Input autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6} className="filter-button">
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            );
        }
    }
);
