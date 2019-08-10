import React from "react";
import { connect } from "react-redux";
import { Form } from "antd";

export default connect(state => ({ browser: state.browser }))(
    class extends React.Component {
        render() {
            const layout = {
                labelCol: {
                    sm: { span: 6 }
                },
                wrapperCol: {
                    sm: { span: 16 }
                }
            };
            const subLayout = {
                labelCol: {
                    sm: { span: 7 }
                },
                wrapperCol: {
                    sm: { span: 17 }
                }
            }
            const { height } = this.props.browser;
            return (
                <Form
                    className="tab-page check-form"
                    style={{ height: height - 166 }}
                >
                    <Form.Item {...layout} label="视力减退">
                        <span className="ant-form-text">1年</span>
                    </Form.Item>
                    <div style={{ display: "flex", padding: "0 25px"}}>
                        <Form.Item style={{ flex: 1 }} {...subLayout} label="眼镜">
                            <span className="ant-form-text">带框眼镜</span>
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} {...subLayout} label="戴镜">
                            <span className="ant-form-text">20年</span>
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} {...subLayout} label="脱镜">
                            <span className="ant-form-text">1年半</span>
                        </Form.Item>
                    </div>
                    <hr />
                    <Form.Item {...layout} label="基本稳定">
                        <span className="ant-form-text">1年</span>
                    </Form.Item>
                    <div className="check-icon">
                        <div className="left" />
                        <div className="right" />
                    </div>
                    <div className="check-form-item">
                        <div className="left">
                            <div className="eye">
                                <span />
                                <span />/<span />
                            </div>
                        </div>
                        <label className="label">眼睛度数</label>
                        <div className="right">
                            <div className="eye">
                                <span />
                                <span />/<span />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Form.Item {...layout} label="严重干眼病史">
                        <span className="ant-form-text">否</span>
                    </Form.Item>
                    <Form.Item {...layout} label="角膜炎病史">
                        <span className="ant-form-text">否</span>
                    </Form.Item>
                    <Form.Item {...layout} label="家族病史">
                        <span className="ant-form-text">父亲</span>
                    </Form.Item>
                    <hr />
                    <Form.Item {...layout} label="全身疾病史">
                        <span className="ant-form-text">否</span>
                    </Form.Item>
                    <Form.Item {...layout} label="精神性病史">
                        <span className="ant-form-text">否</span>
                    </Form.Item>
                    <Form.Item {...layout} label="手术史">
                        <span className="ant-form-text">否</span>
                    </Form.Item>
                    <Form.Item {...layout} label="其他">
                        <span className="ant-form-text">否</span>
                    </Form.Item>
                </Form>
            );
        }
    }
);
