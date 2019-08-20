import { Button, Row, Col, Form, Input, DatePicker } from "antd";
import React from "react";

const { RangePicker } = DatePicker;

export default Form.create()(
    class filter extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                this.props.onFilter &&
                    this.props.onFilter({
                        subscribeName: values.subscribeName,
                        startTime: values.rangeTime && values.rangeTime[0],
                        endTime: values.rangeTime && values.rangeTime[1]
                    });
            });
        };
        handleReset = () => {
            this.props.form.resetFields();
            this.props.onFilter &&
                this.props.onFilter({
                    subscribeName: null,
                    startTime: null,
                    endTime: null
                });
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="filter-form" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item label="姓名">
                                {getFieldDecorator("subscribeName")(
                                    <Input autoComplete="off" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="起始时间">
                                {getFieldDecorator("rangeTime")(
                                    <RangePicker />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12} className="filter-form-button">
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            );
        }
    }
);
