import { connect } from "dva";
import React from "react";
import { Form, Input, Button, Layout } from "antd";
import "./index.less";

const { Header, Content, Footer } = Layout;

function Index({ height, form, dispatch }) {
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    return <Layout className="zz">
        <Header className="zz-header">
            <div className="logo">ZZ公式计算</div>
        </Header>
        <Content className="zz-section" style={{ height }}>
            <div className="zz-input">
                <Form className="zz-input-form">
                    <div>
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
                    </div>
                    <div className="zz-col-2">
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
                    </div>
                </Form>
                <div className="zz-input-btns">
                    <Button.Group>
                        <Button>Clear</Button>
                        <Button type="primary">Caculate</Button>
                    </Button.Group>
                </div>
            </div>
            <div className="zz-output">
                <div className="zz-output-inner">
                    <Form>
                        <Form.Item label="Corrected Sph">
                            <span className="ant-form-text"></span>
                        </Form.Item>
                        <Form.Item label="Corrected Cyl">
                            <span className="ant-form-text"></span>
                        </Form.Item>
                        <Form.Item label="Corrected Axis">
                            <span className="ant-form-text"></span>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Content>
        <Footer className="zz-footer">
            <p>Hangzhou MSK Eye Hospital</p>
        </Footer>
    </Layout>
}

export default connect(
    ({ browser }) => ({
        height: browser.height - 120
    })
)(Form.create()(Index));