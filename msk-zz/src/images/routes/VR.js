import React from "react";
import { connect } from "dva";
import { Form, Input, Row, Col } from "antd";
import { Container } from "components/Master";
import { useIntl } from 'react-intl';

function VectorAnalysisCalculator1({ form, dispatch, params, result }) {
    const intl = useIntl();
    const { getFieldDecorator, validateFieldsAndScroll, resetFields } = form;

    function handleCaculate() {
        validateFieldsAndScroll((err, params) => {
            if (err) return;
            dispatch({ type: "vr/calculate", params });
        });
    }

    function handleClear() {
        resetFields();
        dispatch({ type: "vr/clearResult" })
    }

    const { correctSph, correctCyl, correctCylAxis } = result;

    return <Container
        tip={{
            'INSTRUCTIONS': intl.formatMessage({ id: "VR_INSTRUCTIONS" }),
            'NOTES': intl.formatMessage({ id: "VR_NOTES" })
        }}
        form={<Form>
            <Row>
                <Col span={12}>
                    <Form.Item label="Optical Zone">
                        {getFieldDecorator("opicZone", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'Optical Zone' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Mani Sph">
                        {getFieldDecorator("maniSph", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'Mani Sph' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="Mani Cyl">
                        {getFieldDecorator("maniCyl", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'Mani Cyl' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Mani Cyl Axis">
                        {getFieldDecorator("maniCylAxis", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'Mani Cyl Axis' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="C7">
                        {getFieldDecorator("c7", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'C7' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="C8">
                        {getFieldDecorator("c8", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'C8' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="C11">
                        {getFieldDecorator("c11", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'C11' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="C12">
                        {getFieldDecorator("c12", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'C12' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="C13">
                        {getFieldDecorator("c13", {
                            rules: [{
                                required: true, message: intl.formatMessage({ id: "RULE_REQUIRED" }, { label: 'C13' })
                            }]
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                </Col>
            </Row>
        </Form>}
        result={<Form>
            <Form.Item label="Correct Sph">
                <span className="ant-form-text">{correctSph}</span>
            </Form.Item>
            <Form.Item label="Corrected Cyl">
                <span className="ant-form-text">{correctCyl}</span>
            </Form.Item>
            <Form.Item label="Correct Axis">
                <span className="ant-form-text">{correctCylAxis}</span>
            </Form.Item>
        </Form>}
        onCaculate={handleCaculate}
        onClear={handleClear}
    />
}

export default connect(
    ({ vr }) => ({
        params: vr.params,
        result: vr.result || {}
    })
)(Form.create()(VectorAnalysisCalculator1));