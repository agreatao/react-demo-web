import React from "react";
import {
    ConfigProvider,
    Modal,
    Form,
    Input,
    Row,
    Col,
    Select,
    DatePicker
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import ReactDOM from "react-dom";
import { getFullChars } from "utils/pinyin";
import getAge from "utils/age";

const { TextArea } = Input;
const { Option } = Select;

const ModalForm = Form.create()(
    class extends React.Component {
        state = {
            visible: true
        };
        handleHideModal = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.setState({ visible: false }, () => {
                this.props.onAfterClose && this.props.onAfterClose();
            });
        };
        render() {
            const { data } = this.props;
            const { visible } = this.state;
            const { getFieldDecorator, getFieldValue } = this.props.form;
            return (
                <Modal
                    title={data != null ? "编辑患者" : "新增患者"}
                    maskClosable={false}
                    centered
                    visible={visible}
                    onCancel={this.handleHideModal}
                    width={600}
                >
                    <Form className="patient-form-modal">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="病例号">
                                    {getFieldDecorator("name", {})(
                                        <Input disabled />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="出生年月">
                                    {getFieldDecorator("date", {})(
                                        <DatePicker style={{ width: "100%" }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="姓名">
                                    {getFieldDecorator("name", {})(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="年龄">
                                    <Input
                                        disabled
                                        value={(() => {
                                            let date = getFieldValue("date");
                                            if (date) {
                                                let age = getAge(
                                                    date.format("YYYY-MM-DD")
                                                );
                                                return age > -1 ? age : "";
                                            }
                                            return "";
                                        })()}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="姓名拼音">
                                    <Input
                                        disabled
                                        value={getFullChars(
                                            getFieldValue("name")
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="联系方式">
                                    {getFieldDecorator("name", {})(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="性别">
                                    {getFieldDecorator("name", {})(
                                        <Select>
                                            <Option value="1">男</Option>
                                            <Option value="0">女</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="联系方式">
                                    {getFieldDecorator("name", {})(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="身份证">
                                    {getFieldDecorator("name", {})(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="职业">
                                    {getFieldDecorator("name", {})(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="地址">
                            {getFieldDecorator("address", {})(<TextArea />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default function (data) {
    return new Promise(resolve => {
        let container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(
            <ConfigProvider locale={zhCN}>
                <ModalForm
                    data={data}
                    onAfterClose={() => {
                        let timeout = setTimeout(() => {
                            clearTimeout(timeout);
                            ReactDOM.unmountComponentAtNode(container);
                            container.remove();
                        }, 500);
                        resolve();
                    }}
                />
            </ConfigProvider>,
            container
        );
    });
}
