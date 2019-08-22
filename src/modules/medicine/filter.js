import { Button, Row, Col, Form, Input } from "antd";
import React from "react";

export default Form.create()(
    class Filter extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                this.props.onFilter && this.props.onFilter(values);
            });
        };
        handleReset = () => {
            this.props.form.resetFields();
            this.props.onFilter &&
                this.props.onFilter({
                    drugName: null
                });
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form className="filter-form" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="药品名称">
                                {getFieldDecorator("drugName")(
                                    <Input autoComplete="off" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={18} className="filter-form-button">
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            );
        }
    }
);
