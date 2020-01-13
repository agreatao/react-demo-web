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
            <Form.Item label="A cons">
                {getFieldDecorator("A3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="POST D">
                {getFieldDecorator("O3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="CT">
                {getFieldDecorator("G3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="AC">
                {getFieldDecorator("H3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="kf">
                {getFieldDecorator("B3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="kf2">
                {getFieldDecorator("C3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="kb">
                {getFieldDecorator("D3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="kb2">
                {getFieldDecorator("E3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Axis">
                {getFieldDecorator("F3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="AL">
                {getFieldDecorator("F3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="LT">
                {getFieldDecorator("F3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="SIA D">
                {getFieldDecorator("F3")(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="Incision Axis">
                {getFieldDecorator("F3")(<Input autoComplete="off" />)}
            </Form.Item>
        </Form>}
        result={<Form>
            <Form.Item label="SE">
                <span className="ant-form-text">1</span>
            </Form.Item>
            <Form.Item label="Sperical">
                <span className="ant-form-text">2</span>
            </Form.Item>
            <Form.Item label="Lens asti.">
                <span className="ant-form-text">3</span>
            </Form.Item>
            <Form.Item label="Lens Axis">
                <span className="ant-form-text">3</span>
            </Form.Item>
        </Form>}
        onCaculate={handleCaculate}
        onClear={handleClear}
    />
}

export default connect()(Form.create()(VectorAnalysisCalculator1));