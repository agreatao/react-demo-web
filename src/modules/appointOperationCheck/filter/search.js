import { Button, Row, Col, Form, Input, DatePicker } from "antd";
import React from "react";

const { RangePicker } = DatePicker;

export default Form.create()(
    class Filter extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                const { name, phone, rangeTime } = values;
                const [startTime, endTime] = rangeTime;
                this.props.onFilter && this.props.onFilter({ name, phone, startTime, endTime });
            });
        };
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onFilter &&
                this.props.onFilter({
                    name: null,
                    phone: null,
                    startTime: null,
                    endTime: null
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
                            <Form.Item label="预约时间">{getFieldDecorator("rangeTime")(<RangePicker format="yyyy-MM-dd HH:mm" style={{ width: "100%" }} showTime={{ format: "HH:mm" }} />)}</Form.Item>
                        </Col>
                        <Col span={6} className="filter-form-button">
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
