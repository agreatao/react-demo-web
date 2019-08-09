import React from "react";
import {
    ConfigProvider,
    Icon,
    Form,
    Input,
    Row,
    Col,
    Select,
    DatePicker,
    Button
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import ReactDOM from "react-dom";
import { getFullChars } from "utils/pinyin";
import getAge from "utils/age";
import Bars from "components/bars";
import {
    Provider
} from "react-redux";
import store from "store";

const { TextArea } = Input;
const { Option } = Select;

const ModalForm = Form.create()(
    class extends React.Component {
        componentDidMount() {
            this.props.onInit && this.props.onInit();
        }
        handleHideModal = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.setState({ visible: false }, () => {
                this.props.onAfterClose && this.props.onAfterClose();
            });
        };
        render() {
            const { data } = this.props;
            const { getFieldDecorator, getFieldValue } = this.props.form;
            return (
                <React.Fragment>
                    <Bars left={
                        <React.Fragment>
                            <a onClick={this.handleHideModal}><Icon type="left" /></a>
                            <span>{data ? "编辑" : "新增"}患者</span>
                        </React.Fragment>
                    }
                        right={
                            <React.Fragment>
                                <Button type="primary">提交</Button>
                            </React.Fragment>
                        }
                    />
                    <Form className="patient-form">
                        <div className="form-col">
                            <h4 className="sub-title">患者基本信息</h4>
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
                        </div>
                        <div className="form-col">
                            <h4 className="sub-title">既往病史</h4>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="视力减退">
                                        {getFieldDecorator("test")(<Input />)}
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                    <div className="sub-form-item">
                                        <Form.Item label="眼睛">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                        <Form.Item label="戴镜">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                        <Form.Item label="脱镜">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                        <a className="control-btn"><Icon type="minus" /></a>
                                    </div>
                                    <div className="sub-form-item">
                                        <Form.Item label="眼睛">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                        <Form.Item label="戴镜">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                        <Form.Item label="脱镜">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                        <a className="control-btn"><Icon type="minus" /></a>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="基本稳定">
                                        {getFieldDecorator("test")(<Input />)}
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                    <div className="sub-form-item">
                                        <Form.Item label="左眼">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                        <Form.Item label="右眼">
                                            {getFieldDecorator("test")(<Input />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <Form.Item label="严重干眼病史">

                            </Form.Item>
                            <Form.Item label="角膜炎病史">

                            </Form.Item>
                            <Form.Item label="家族病史">

                            </Form.Item>
                            <hr />
                            <Form.Item label="全身疾病史">

                            </Form.Item>
                            <Form.Item label="精神性病史">

                            </Form.Item>
                            <Form.Item label="手术史">

                            </Form.Item>
                            <Form.Item label="其他">

                            </Form.Item>
                        </div>
                    </Form>
                </React.Fragment >
            );
        }
    }
);

export default function (data) {
    return new Promise(resolve => {
        let container = document.createElement("div");
        document.body.appendChild(container);
        container.classList.add("patient-form-modal");
        ReactDOM.render(
            <Provider store={store}>
                <ConfigProvider locale={zhCN}>
                    <ModalForm
                        data={data}
                        onInit={() => {
                            let timeout = setTimeout(() => {
                                clearTimeout(timeout);
                                container.classList.add("active");
                            }, 0);
                        }}
                        onAfterClose={() => {
                            container.classList.remove("active");
                            let timeout = setTimeout(() => {
                                clearTimeout(timeout);
                                ReactDOM.unmountComponentAtNode(container);
                                container.remove();
                            }, 500);
                            resolve();
                        }}
                    />
                </ConfigProvider>
            </Provider>,
            container
        );
    });
}
