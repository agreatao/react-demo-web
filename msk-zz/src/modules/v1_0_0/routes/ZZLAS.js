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
            <Form.Item label="Opic Zone">
                {getFieldDecorator("A3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Vertex">
                {getFieldDecorator("O3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="D">
                {getFieldDecorator("G3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="e">
                {getFieldDecorator("H3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Post Q">
                {getFieldDecorator("B3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="入射点">
                {getFieldDecorator("C3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="P Vertex">
                {getFieldDecorator("D3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="D2">
                {getFieldDecorator("E3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="e2">
                {getFieldDecorator("F3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Post Q2">
                {getFieldDecorator("F3")(<Input autoComplete="off" />)}
            </Form.Item>
        </Form>}
        result={<Form>
            <Form.Item label="Q">
                <span className="ant-form-text">1</span>
            </Form.Item>
            <Form.Item label="LSA(D)">
                <span className="ant-form-text">2</span>
            </Form.Item>
            <Form.Item label="Post LSA(D)">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="δQ">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="δ总LSA（D）">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="入射点">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="Q2">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="LSA(D)">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="Post LSA(D)">
                <span className="ant-form-text">3</span>
            </Form.Item>
        </Form>}
        onCaculate={handleCaculate}
        onClear={handleClear}
    />
}

export default connect()(Form.create()(VectorAnalysisCalculator1));