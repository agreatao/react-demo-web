import React from "react";
import { connect } from "dva";
import { Form, Input } from "antd";
import { Container } from "components/Master";

function VectorAnalysisCalculator1({ form }) {

    const { getFieldDecorator, validateFieldsAndScroll, resetFields } = form;

    function handleCaculate() {
        validateFieldsAndScroll((err, values) => {
            if (err) return;
            console.log(values);
        })
    }

    function handleClear() {
        resetFields();
    }

    return <Container
        form={<Form>
            <Form.Item label="Sph 1">
                {getFieldDecorator("A3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Cyl 1">
                {getFieldDecorator("O3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Axis 1">
                {getFieldDecorator("G3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Sph 2">
                {getFieldDecorator("H3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Cyl 2">
                {getFieldDecorator("B3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Axis 2">
                {getFieldDecorator("C3")(<Input autoComplete="off" />)}
            </Form.Item>
        </Form>}
        result={<Form>
            <Form.Item label="Sph 1+2">
                <span className="ant-form-text">1</span>
            </Form.Item>
            <Form.Item label="Cyl 1+2">
                <span className="ant-form-text">2</span>
            </Form.Item>
            <Form.Item label="Axis">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="Sph 1-2">
                <span className="ant-form-text">1</span>
            </Form.Item>
            <Form.Item label="Cyl 1-2">
                <span className="ant-form-text">2</span>
            </Form.Item>
            <Form.Item label="Axis2">
                <span className="ant-form-text">3</span>
            </Form.Item>
        </Form>}
        onCaculate={handleCaculate}
        onClear={handleClear}
    />
}

export default connect()(Form.create()(VectorAnalysisCalculator1));