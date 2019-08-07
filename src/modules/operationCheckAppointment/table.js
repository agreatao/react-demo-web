import React from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, DatePicker, Button, Row, Col } from "antd";

const { RangePicker } = DatePicker;

import Bars from "components/bars";
import Table from "components/table";
import Pagination from "components/pagination";

export default connect(state => ({ browser: state.browser, bars: state.bars }))(
    class extends React.Component {
        render() {
            const { browser, bars } = this.props;
            return (
                <div className="appointment-table-data">
                    <Bars
                        left={
                            <React.Fragment>
                                <a>
                                    <Icon type="plus" />
                                    新增预约
                                </a>
                            </React.Fragment>
                        }
                    >
                        <Filter />
                    </Bars>
                    <Table
                        style={{ height: browser.height - bars.height - 100 }}
                    />
                    <Pagination />
                </div>
            );
        }
    }
);

const Filter = Form.create()(
    class extends React.Component {
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="appointment-table-data-filter" layout="inline">
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="姓名">
                                {getFieldDecorator("name")(<Input />)}
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
