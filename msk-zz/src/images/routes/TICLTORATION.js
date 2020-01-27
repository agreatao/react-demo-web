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
            <Form.Item label="Mani Sph">
                {getFieldDecorator("A3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Mani Cyl">
                {getFieldDecorator("O3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Mani Axis">
                {getFieldDecorator("G3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Resi Sph">
                {getFieldDecorator("H3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Resi Cyl">
                {getFieldDecorator("B3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Resi Axis">
                {getFieldDecorator("C3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="SIA D">
                {getFieldDecorator("D3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Incision Axis">
                {getFieldDecorator("E3")(<Input autoComplete="off" />)}
            </Form.Item>
        </Form>}
        result={<Form>
            <Form.Item label="Clockwise">
                <span className="ant-form-text">1</span>
            </Form.Item>
            <Form.Item label="Sph">
                <span className="ant-form-text">2</span>
            </Form.Item>
            <Form.Item label="Cyl">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="Axis">
                <span className="ant-form-text">3</span>
            </Form.Item>
        </Form>}
        onCaculate={handleCaculate}
        onClear={handleClear}
    />
}

export default connect()(Form.create()(VectorAnalysisCalculator1));