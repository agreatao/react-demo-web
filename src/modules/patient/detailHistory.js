import React from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import http from "utils/http";

export default connect(state => ({ browser: state.browser }))(
    class extends React.Component {
        state = {
            data: null
        }
        loadData(sickId) {
            http.get("/sick/querySickHistory", { params: { sickId } }).then(data => {
                this.setState({ data: data.result })
            }).catch(e => { })
        }
        componentDidMount() {
            if (this.props.dataKey)
                this.loadData(this.props.dataKey);
        }
        componentWillReceiveProps(nextProps) {
            if (!nextProps.dataKey)
                this.setState({ data: null })
            else if (nextProps.dataKey != this.props.dataKey)
                this.loadData(nextProps.dataKey);
        }
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
            const { data } = this.state;
            return (
                <Form
                    className="tab-page check-form"
                    style={{ height: height - 166 }}
                >
                    <Form.Item {...layout} label="视力减退">
                        <span className="ant-form-text">{data && data.sljt}</span>
                    </Form.Item>
                    <div style={{ display: "flex", padding: "0 25px" }}>
                        <Form.Item style={{ flex: 1 }} {...subLayout} label="眼镜">
                            <span className="ant-form-text">{data && data.glassType}</span>
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} {...subLayout} label="戴镜">
                            <span className="ant-form-text">{data && data.glassYear}</span>
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} {...subLayout} label="脱镜">
                            <span className="ant-form-text"></span>
                        </Form.Item>
                    </div>
                    <hr />
                    <Form.Item {...layout} label="基本稳定">
                        <span className="ant-form-text">{data && data.steadyYear}</span>
                    </Form.Item>
                    <div className="check-icon">
                        <div className="left" />
                        <div className="right" />
                    </div>
                    <div className="check-form-item">
                        <div className="left">
                            <div className="eye">

                                <span>{data && data.degreeL1}</span>
                                <span>{data && data.degreeL2}</span>
                                /
                                <span>{data && data.degreeL3}</span>
                            </div>
                        </div>
                        <label className="label">眼睛度数</label>
                        <div className="right">
                            <div className="eye">
                                <span>{data && data.degreeR1}</span>
                                <span>{data && data.degreeR2}</span>
                                /
                                <span>{data && data.degreeR3}</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Form.Item {...layout} label="严重干眼病史">
                        <span className="ant-form-text">{data && data.bool1}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="角膜炎病史">
                        <span className="ant-form-text">{data && data.bool2}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="家族病史">
                        <span className="ant-form-text">{data && data.glassFamily}</span>
                    </Form.Item>
                    <hr />
                    <Form.Item {...layout} label="全身疾病史">
                        <span className="ant-form-text">{data && data.bool3}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="精神性病史">
                        <span className="ant-form-text">{data && data.bool4}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="手术史">
                        <span className="ant-form-text">{data && data.bool5}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="其他">
                        <span className="ant-form-text">{data && data.bool6}</span>
                    </Form.Item>
                </Form>
            );
        }
    }
);
