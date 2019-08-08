import React from "react";
import { connect } from "react-redux";
import { Row, Col, Icon, Form, Input, DatePicker, Button } from "antd";
import Bars from "components/bars";
import Table from "components/table";
import Pagination from "components/pagination";
import { remove } from "components/alert";
import http from "utils/http";
import patientFormModal from "./formModal";

const { RangePicker } = DatePicker;

export default connect(
    state => ({ browser: state.browser, bars: state.bars })
)(class extends React.Component {
    state = {
        pageNo: 1,
        loading: false,
        selectedRowKeys: null,
        tableData: null
    }
    fetch(params) {
        this.setState({ loading: true }, () => {
            http.get("/url", { params }).then(data => {
                this.setState({
                    loading: false,
                    tableData: [{ id: 1 }, { id: 2 }]
                });
            }).catch(e => {
                this.setState({ loading: false, tableData: [{ id: 1 }, { id: 2 }] })
            })
        })
    }
    componentDidMount() {
        this.fetch({});
    }
    handleRowClick(record, e) {
        e.preventDefault();
        const { onRowSelect } = this.props;
        onRowSelect && onRowSelect(record);
    }
    handleAdd = (e) => {
        e.preventDefault();
        patientFormModal().then(() => {

        }).catch(() => { });
    }
    handleEdit(data, e) {
        e && e.stopPropagation();
        patientFormModal().then(() => {

        }).catch(() => { });
    }
    handleDelete(ids, e) {
        e && e.stopPropagation();
        if (ids && ids.length > 0)
            remove().then(() => {
                console.log(ids);
            }).catch(() => { })
    }
    handleRowSelect = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }
    handlePageChange = (pageNo) => {
        this.setState({ pageNo });
    }
    render() {
        const { browser, bars } = this.props;
        const { pageNo, loading, tableData, selectedRowKeys } = this.state;
        return (
            <div className="patient-table-data">
                <Bars
                    left={
                        <React.Fragment>
                            <a onClick={this.handleAdd}><Icon type="plus" />新增患者</a>
                            <a onClick={e => this.handleDelete(this.state.selectedRowKeys, e)}><Icon type="delete" />删除</a>
                        </React.Fragment>
                    }
                >
                    <Filter />
                </Bars>
                <Table
                    className="patient-table"
                    loading={loading}
                    style={{ height: browser.height - bars.height - 100 }}
                    rowKey="id"
                    columns={[
                        {
                            title: '病历号',
                            dataIndex: 'id'
                        },
                        {
                            title: '姓名',
                            dataIndex: 'name'
                        },
                        {
                            title: '性别',
                            dataIndex: 'sex'
                        },
                        {
                            title: '年龄',
                            dataIndex: 'age'
                        },
                        {
                            title: '联系方式',
                            dataIndex: 'contact'
                        },
                        {
                            title: '就诊时间',
                            dataIndex: 'time'
                        },
                        {
                            title: "操作",
                            key: "action",
                            dataIndex: "id",
                            className: "actions",
                            render: (id, row) => <React.Fragment>
                                <a onClick={e => this.handleEdit(row, e)}>编辑</a>
                                <a onClick={e => this.handleDelete([id], e)}>删除</a>
                            </React.Fragment>
                        }
                    ]}
                    dataSource={tableData}
                    onRow={record => ({
                        onClick: e => this.handleRowClick(record, e)
                    })}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: this.handleRowSelect,
                        onSelect: (record, selected, selectedRows, e) => e.stopPropagation()
                    }}
                />
                <Pagination
                    total={100}
                    pageNo={pageNo}
                    onPageChange={this.handlePageChange}
                />
            </div>
        );
    }
})

const Filter = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                let startTime = null, endTime = null;
                const { code, name, contact, rangeTime } = values;
                if (rangeTime) [startTime, endTime] = rangeTime;
                console.log({
                    code, name, contact, startTime, endTime
                })
            })
        }
        handleReset = () => {
            this.props.form.resetFields();
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="patient-table-data-filter" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="病例号">
                                {getFieldDecorator("code")(<Input placeholder="请输入病历号" autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="姓名">
                                {getFieldDecorator("name")(<Input placeholder="请输入姓名" autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="联系方式">
                                {getFieldDecorator("contact")(<Input placeholder="请输入联系方式" autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="起始时间">
                                {getFieldDecorator("rangeTime")(<RangePicker showTime />)}
                            </Form.Item>
                        </Col>
                        <Col span={8} className="filter-button">
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            );
        }
    }
);
