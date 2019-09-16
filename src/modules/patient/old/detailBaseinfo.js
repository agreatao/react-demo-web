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
            const { data } = this.props;
            return (
                <Form className="tab-page" style={{ height: height - 166 }}>
                    <Form.Item {...layout} label="病历号">
                        <span className="ant-form-text">{data && data.sickId}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="姓名">
                        <span className="ant-form-text">{data && data.sickName}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="姓名拼音">
                        <span className="ant-form-text"></span>
                    </Form.Item>
                    <Form.Item {...layout} label="性别">
                        <span className="ant-form-text">{data && data.sickSex}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="出生年月">
                        <span className="ant-form-text"></span>
                    </Form.Item>
                    <Form.Item {...layout} label="年龄">
                        <span className="ant-form-text"></span>
                    </Form.Item>
                    <Form.Item {...layout} label="身份证">
                        <span className="ant-form-text"></span>
                    </Form.Item>
                    <Form.Item {...layout} label="职业">
                        <span className="ant-form-text">{data && data.work}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="联系方式">
                        <span className="ant-form-text">{data && data.phone}</span>
                    </Form.Item>
                    <Form.Item {...layout} label="地址">
                        <span className="ant-form-text">{data && data.address}</span>
                    </Form.Item>
                </Form>
            );
        }
    }
);
