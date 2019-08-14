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
        patientFormModal(data).then(() => {

        }).catch(() => { });
    }
    handleDelete(ids, e) {
        e && e.stopPropagation();
        if (ids && ids.length > 0)
            remove().then(() => {
                console.log(ids);
            }).catch(() => { })
    }
    handleRowSelect = (selectedIds) => {
        this.setState({ selectedIds })
    }
    handlePageChange = (currentPage) => {
        this.setState({ currentPage }, () => {
            this.fetch();
        });
    }
    render() {
        const { browser, bars } = this.props;
        const { currentPage, pageSize, loading, tableData, total, selectedIds } = this.state;
        return (
            <div className="patient-table-data">
                <Bars
                    left={
                        <React.Fragment>
                            <a onClick={this.handleAdd}><Icon type="plus" />新增患者</a>
                            <a onClick={e => this.handleDelete(this.state.selectedIds, e)}><Icon type="delete" />删除</a>
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
                            dataIndex: 'phone'
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
                        selectedRowKeys: selectedIds,
                        onChange: this.handleRowSelect,
                        onSelect: (record, selected, selectedRows, e) => e.stopPropagation()
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
