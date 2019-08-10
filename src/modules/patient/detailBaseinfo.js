import React from "react";
import { connect } from "react-redux";
import { Form } from "antd";

export default connect(state => ({ browser: state.browser }))(
    class extends React.Component {
        render() {
            const layout = {
                labelCol: {
                    sm: { span: 5 }
                },
                wrapperCol: {
                    sm: { span: 18 }
                }
            };
            const { height } = this.props.browser;
            return (
                <Form className="tab-page" style={{ height: height - 166 }}>
                    <Form.Item {...layout} label="病历号">
                        <span className="ant-form-text">23241411</span>
                    </Form.Item>
                    <Form.Item {...layout} label="姓名">
                        <span className="ant-form-text">你好</span>
                    </Form.Item>
                    <Form.Item {...layout} label="姓名拼音">
                        <span className="ant-form-text">NiHao</span>
                    </Form.Item>
                    <Form.Item {...layout} label="性别">
                        <span className="ant-form-text">男</span>
                    </Form.Item>
                    <Form.Item {...layout} label="出生年月">
                        <span className="ant-form-text">2019-10-20</span>
                    </Form.Item>
                    <Form.Item {...layout} label="年龄">
                        <span className="ant-form-text">21</span>
                    </Form.Item>
                    <Form.Item {...layout} label="身份证">
                        <span className="ant-form-text">324412412421415</span>
                    </Form.Item>
                    <Form.Item {...layout} label="职业">
                        <span className="ant-form-text">学生</span>
                    </Form.Item>
                    <Form.Item {...layout} label="联系方式">
                        <span className="ant-form-text">12331415120</span>
                    </Form.Item>
                    <Form.Item {...layout} label="地址">
                        <span className="ant-form-text">浙江省杭州市滨江区西兴街道绿地旭辉城9幢23号3201室</span>
                    </Form.Item>
                </Form>
            );
        }
    }
);
