import { Button, Col, Form, Icon, Input, Row, Select } from "antd";
import { remove } from "components/alert";
import Bars from "components/bars";
import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import http from "utils/http";
import medicineFormModal from "./formModal";

const { Option } = Select;

import { confirm } from "components/alert";

export default connect(state => ({ browser: state.browser, bars: state.bars }))(
    class extends React.Component {
        state = {
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            loading: false,

            tableData: null,
            total: 0
        };

        params = {
            drugName: null
        };
        fetch() {
            const { currentPage, pageSize } = this.state;
            const params = this.params;
            this.setState({ loading: true }, () => {
                http.post("/user/getUserInfoList", params, {
                    params: {
                        currentPage,
                        pageSize
                    }
                }).then(data => {
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
            confirm();
        };
        handleEdit = (data, e) => {
            e.preventDefault();
        };
        handleRowSelect = selectedIds => {
            this.setState({ selectedIds });
        };
        handleDelete = (ids, e) => {
            e && e.preventDefault();
            if (ids && ids.length > 0)
                remove()
                    .then(() => {
                        http.get("/user/deleteUserInfo", {
                            params: { ids: ids.join(",") }
                        })
                            .then(() => {
                                let {
                                    total,
                                    currentPage,
                                    pageSize
                                } = this.state;
                                currentPage = Math.min(
                                    currentPage,
                                    Math.ceil((total - 1) / pageSize)
                                );
                                this.setState({ currentPage }, () => {
                                    this.fetch();
                                });
                            })
                            .catch(e => {});
                    })
                    .catch(() => {});
        };
        render() {
            const { browser, bars } = this.props;
            const {
                currentPage,
                pageSize,
                tableData,
                total,
                selectedIds,
                loading
            } = this.state;
            return (
                <div className="medicine-content">
                    <Bars
                        left={
                            <React.Fragment>
                                <a onClick={this.handleAdd}>
                                    <Icon type="plus" />
                                    新增
                                </a>
                                <a
                                    onClick={e =>
                                        this.handleDelete(
                                            this.state.selectedIds,
                                            e
                                        )
                                    }
                                >
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
                        scroll={{
                            y: browser.height - bars.height - 155,
                            x: 1500
                        }}
                        columns={[
                            {
                                title: "姓名",
                                dataIndex: "nickName",
                                width: 150
                            },
                            {
                                title: "手机号码",
                                dataIndex: "telephone",
                                width: 100
                            },
                            {
                                title: "职位",
                                dataIndex: "roleId",
                                width: 200,
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
                                width: 100,
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
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                this.props.onFilter && this.props.onFilter(values);
            });
        };
        handleReset = () => {
            ``;
            this.props.form.resetFields();
            this.props.onFilter &&
                this.props.onFilter({
                    nickName: null,
                    telephone: null,
                    roleId: null
                });
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form
                    className="medicine-filter"
                    layout="inline"
                    onSubmit={this.handleSubmit}
                >
                    <Row gutter={24}>
                        <Col span={18}>
                            <Form.Item label="姓名">
                                {getFieldDecorator("nickName")(
                                    <Input autoComplete="off" />
                                )}
                            </Form.Item>
                            <Form.Item label="手机号码">
                                {getFieldDecorator("telephone")(
                                    <Input autoComplete="off" />
                                )}
                            </Form.Item>
                            <Form.Item label="职级">
                                {getFieldDecorator("roleId")(
                                    <Select style={{ width: 200 }}>
                                        <Option value="2">医生</Option>
                                        <Option value="3">护士</Option>
                                    </Select>
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
