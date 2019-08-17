import { Button, Col, DatePicker, Form, Icon, Input, Row } from "antd";
import { remove } from "components/alert";
import Bars from "components/bars";
import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import http from "utils/http";
import appointmentFormModal from "./formModal";

const { RangePicker } = DatePicker;

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
            subscribeName: null,
            startTime: null,
            endTime: null
        }
        fetch() {
            const { currentPage, pageSize } = this.state;
            const params = this.params;
            this.setState({ loading: true }, () => {
                http.post("/sick/getSubscribeList", params, {
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
            appointmentFormModal()
                .then(isUpdate => { isUpdate && this.fetch() })
                .catch(() => { });
        };
        handleEdit = (data, e) => {
            e.preventDefault();
            appointmentFormModal(data)
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
                        http.get("/sick/deleteSubscribe", { params: { ids: ids.join(",") } }).then(() => {
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
                <div className="appointment-content">
                    <Bars
                        left={
                            <React.Fragment>
                                <a onClick={this.handleAdd}>
                                    <Icon type="plus" />
                                    新增预约
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
                        columns={[
                            {
                                title: "姓名",
                                dataIndex: "subscribeName"
                            },
                            {
                                title: "预约时间",
                                dataIndex: "date"
                            },
                            {
                                title: "手机号码",
                                dataIndex: "mobilePhone"
                            },
                            {
                                title: "操作",
                                className: "actions",
                                dataIndex: "id",
                                render: (id, row) => (
                                    <React.Fragment>
                                        <a
                                            onClick={e =>
                                                this.handleEdit(row, e)
                                            }
                                        >
                                            修改
                                        </a>
                                        <a
                                            onClick={e =>
                                                this.handleDelete([id], e)
                                            }
                                        >
                                            删除
                                        </a>
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
                this.props.onFilter && this.props.onFilter({
                    subscribeName: values.subscribeName,
                    startTime: values.rangeTime && values.rangeTime[0],
                    endTime: values.rangeTime && values.rangeTime[1]
                })
            })
        }
        handleReset = () => {
            this.props.form.resetFields();
            this.props.onFilter && this.props.onFilter({
                subscribeName: null,
                startTime: null,
                endTime: null
            })
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="appointment-table-data-filter" layout="inline" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="姓名">
                                {getFieldDecorator("subscribeName")(<Input autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="起始时间">
                                {getFieldDecorator("rangeTime")(
                                    <RangePicker />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6} className="filter-button">
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            );
        }
    }
);
