import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { appointTimes } from "dic";
import React from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default Form.create()(
    class Filter extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                const { name, phone, rangeDate, appointTime } = values;
                const [startDate, endDate] = rangeDate || [null, null];
                this.props.onFilter && this.props.onFilter({ name, phone, startDate, endDate, appointTime });
            });
        };
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onFilter &&
                this.props.onFilter({
                    name: null,
                    phone: null,
                    startDate: null,
                    endDate: null,
                    appointTime: null
                });
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="filter-form" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item label="姓名">{getFieldDecorator("name")(<Input autoComplete="off" />)}</Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="手机号码">{getFieldDecorator("phone")(<Input autoComplete="off" />)}</Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="预约时间">{getFieldDecorator("rangeDate")(<RangePicker format="YYYY-MM-DD" style={{ width: "100%" }} />)}</Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="时间段">
                                {getFieldDecorator("appointTime")(
                                    <Select style={{ width: "100%" }}>
                                        {appointTimes.map(item => (
                                            <Option value={item.value} key={item.value}>
                                                {item.text}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24} className="filter-form-button">
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
