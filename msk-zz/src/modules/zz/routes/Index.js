import { connect } from "dva";
import React from "react";
import { Form, Input, Button } from "antd";

function Index({ height, form, dispatch }) {
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    return <div className="zz">
        <header className="zz-header">

        </header>
        <section className="zz-section">
            <Form className="zz-input">
                <Form.Item label="Optical Zone">
                    {getFieldDecorator("A3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="Manifest Sph">
                    {getFieldDecorator("O3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="Manifest Cyl">
                    {getFieldDecorator("G3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="Manifest Axis">
                    {getFieldDecorator("H3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="C7">
                    {getFieldDecorator("B3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="C8">
                    {getFieldDecorator("C3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="C11">
                    {getFieldDecorator("D3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="C12">
                    {getFieldDecorator("E3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="C13">
                    {getFieldDecorator("F3")(<Input autoComplete="off" />)}
                </Form.Item>
                <Button.Group className="zz-input-btns">
                    <Button type="primary">Caculate</Button>
                    <Button>Clear</Button>
                </Button.Group>
            </Form>
            <div className="zz-output">

            </div>
        </section>
        <footer className="zz-footer">

        </footer>
    </div>
}

export default connect(
    ({ browser }) => ({
        height: browser.height
    })
)(Form.create()(Index));