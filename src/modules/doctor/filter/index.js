import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

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
                this.props.onFilter({ nickName: null, telephone: null, roleId: null });
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            return <Form className="filter-form" onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    <Col span={4}>
                        <Form.Item label="姓名">
                            {getFieldDecorator("nickName")(
                                <Input autoComplete="off" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="手机号码">
                            {getFieldDecorator("telephone")(
                                <Input autoComplete="off" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="职位">
                            {getFieldDecorator("roleId")(
                                <Select>
                                    <Option value="2">医生</Option>
                                    <Option value="3">护士</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="审批状态">
                            {getFieldDecorator("status")(
                                <Select>
                                    <Option value="0">待审批</Option>
                                    <Option value="1">已审批</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8} className="filter-form-button">
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        }
    }
);
