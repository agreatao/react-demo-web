import { Button, Row, Col, Form, Input } from "antd";
import React from "react";

export default Form.create()(
    class Filter extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                this.props.onFilter && this.props.onFilter(values);
            });
        };
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onFilter &&
                this.props.onFilter({
                    name: null,
                    phone: null
                });
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="filter-form" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="姓名">{getFieldDecorator("name")(<Input autoComplete="off" />)}</Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="手机号码">{getFieldDecorator("phone")(<Input autoComplete="off" />)}</Form.Item>
                        </Col>
                        <Col span={12} className="filter-form-button">
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
