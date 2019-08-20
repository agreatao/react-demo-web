import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";

const { RangePicker } = DatePicker;

export default Form.create()(
    class Filter extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                let startTime = null, endTime = null;
                const { sickId, sickName, mobilePhone, rangeTime } = values;
                if (rangeTime) [startTime, endTime] = rangeTime;
                this.props.onFilter && this.props.onFilter({
                    startTime,
                    endTime,
                    sickId,
                    sickName,
                    mobilePhone
                })
            })
        }
        handleReset = () => {
            this.props.form.resetFields();
            this.props.onFilter && this.props.onFilter({
                startTime: null,
                endTime: null,
                sickId: null,
                sickName: null,
                mobilePhone: null
            })
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="filter-form" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="病例号">
                                {getFieldDecorator("sickId")(<Input placeholder="请输入病历号" autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="姓名">
                                {getFieldDecorator("sickName")(<Input placeholder="请输入姓名" autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="联系方式">
                                {getFieldDecorator("mobilePhone")(<Input placeholder="请输入联系方式" autoComplete="off" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="起始时间">
                                {getFieldDecorator("rangeTime")(<RangePicker showTime style={{ width: "100%" }} />)}
                            </Form.Item>
                        </Col>
                        <Col span={16} className="filter-form-button">
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            );
        }
    }
);
