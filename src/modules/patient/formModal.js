import React from "react";
import {
    ConfigProvider,
    Icon,
    Form,
    Input,
    Select,
    DatePicker,
    Button
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import ReactDOM from "react-dom";
import { getFullChars } from "utils/pinyin";
import getAge from "utils/age";
import Bars from "components/bars";
import { Provider } from "react-redux";
import CheckInput from "./common/checkInput";
import Inputs from "./common/inputs";
import store from "store";
import http from "utils/http";

const { TextArea } = Input;
const { Option } = Select;

const ModalForm = Form.create()(
    class extends React.Component {
        componentDidMount() {
            this.props.onInit && this.props.onInit();
            http.get("/sick/getRandomSickId").then(data => {
                this.props.form.setFieldsValue({
                    sickId: data.result
                })
            })
        }
        handleHideModal = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onAfterClose && this.props.onAfterClose();
        };
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;



                console.log(values);
            })
        }
        render() {
            const { data } = this.props;
            const { getFieldDecorator, getFieldValue } = this.props.form;
            return (
                <React.Fragment>
                    <Bars
                        left={
                            <React.Fragment>
                                <a onClick={this.handleHideModal}>
                                    <Icon type="left" />
                                </a>
                                <span>{data ? "编辑" : "新增"}患者</span>
                            </React.Fragment>
                        }
                        right={
                            <React.Fragment>
                                <Button type="primary" onClick={this.handleSubmit}>{data != null ? "修改" : "保存"}</Button>
                            </React.Fragment>
                        }
                    />
                    <Form className="patient-form">
                        <div className="patient-form-col">
                            <h4 className="sub-title">患者基本信息</h4>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="病例号">
                                        {getFieldDecorator("sickId", {
                                            initialValue: data && data.sickId
                                        })(
                                            <Input disabled />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="出生年月">
                                        {getFieldDecorator("birth", {
                                            initialValue: data && data.birth
                                        })(
                                            <DatePicker
                                                style={{ width: "100%" }}
                                            />
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="姓名">
                                        {getFieldDecorator("sickName", {
                                            initialValue: data && data.sickName
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="年龄">
                                        <Input
                                            disabled
                                            value={(() => {
                                                let date = getFieldValue(
                                                    "birth"
                                                );
                                                if (date) {
                                                    let age = getAge(
                                                        date.format(
                                                            "YYYY-MM-DD"
                                                        )
                                                    );
                                                    return age > -1 ? age : "";
                                                }
                                                return "";
                                            })()}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="姓名拼音">
                                        <Input
                                            disabled
                                            value={getFullChars(
                                                getFieldValue("sickName")
                                            )}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="联系方式">
                                        {getFieldDecorator("phone", {
                                            initialValue: data && data.phone
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="性别">
                                        {getFieldDecorator("sickSex", {
                                            initialValue: data && data.sickSex
                                        })(
                                            <Select>
                                                <Option value="男">男</Option>
                                                <Option value="女">女</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="职业">
                                        {getFieldDecorator("work", {
                                            initialValue: data && data.work
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="身份证">
                                        {getFieldDecorator("idcard", {})(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-col"></div>
                            </div>
                            <Form.Item label="地址">
                                {getFieldDecorator("address", {
                                    initialValue: data && data.address
                                })(<TextArea />)}
                            </Form.Item>
                        </div>
                        <div className="patient-form-col">
                            <h4 className="sub-title">既往病史</h4>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="视力减退">
                                        {getFieldDecorator("test")(<Input />)}
                                    </Form.Item>
                                </div>
                                <div className="form-col flex-1">
                                    <div className="form-row sub-form-item">
                                        <Form.Item label="眼睛">
                                            {getFieldDecorator("test")(
                                                <Select style={{ width: 125 }}>
                                                    <Option value="框架眼镜">
                                                        框架眼镜
                                                    </Option>
                                                    <Option value="软片隐形眼镜">
                                                        软片隐形眼镜
                                                    </Option>
                                                    <Option value="RGP">
                                                        RGP
                                                    </Option>
                                                    <Option value="OK镜">
                                                        OK镜
                                                    </Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="戴镜">
                                            {getFieldDecorator("test")(
                                                <Input />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="脱镜">
                                            {getFieldDecorator("test")(
                                                <Input />
                                            )}
                                        </Form.Item>
                                        <a className="control-btn">
                                            <Icon type="minus-circle" />
                                        </a>
                                    </div>
                                    <div className="form-row sub-form-item">
                                        <Form.Item label="眼睛">
                                            {getFieldDecorator("test")(
                                                <Select style={{ width: 125 }}>
                                                    <Option value="框架眼镜">
                                                        框架眼镜
                                                    </Option>
                                                    <Option value="软片隐形眼镜">
                                                        软片隐形眼镜
                                                    </Option>
                                                    <Option value="RGP">
                                                        RGP
                                                    </Option>
                                                    <Option value="OK镜">
                                                        OK镜
                                                    </Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="戴镜">
                                            {getFieldDecorator("test")(
                                                <Input />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="脱镜">
                                            {getFieldDecorator("test")(
                                                <Input />
                                            )}
                                        </Form.Item>
                                        <a className="control-btn">
                                            <Icon type="plus-circle" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="基本稳定">
                                        {getFieldDecorator("test")(<Input />)}
                                    </Form.Item>
                                </div>
                                <div className="form-col flex-1">
                                    <div className="form-row sub-form-item">
                                        <Form.Item label="左眼">
                                            {getFieldDecorator("test")(
                                                <Inputs />
                                            )}
                                        </Form.Item>
                                        <Form.Item label="右眼">
                                            {getFieldDecorator("test")(
                                                <Inputs />
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <Form.Item label="严重干眼病史">
                                {getFieldDecorator("heavyEye")(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="角膜炎病史">
                                {getFieldDecorator("heavyEye")(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="家族病史">
                                {getFieldDecorator("heavyEye")(
                                    <Select style={{ width: 100 }}>
                                        <Option value="父亲">父亲</Option>
                                        <Option value="母亲">母亲</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <hr />
                            <Form.Item label="全身疾病史">
                                {getFieldDecorator("heavyEye")(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="精神性病史">
                                {getFieldDecorator("heavyEye")(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="手术史">
                                {getFieldDecorator("heavyEye")(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="其他">
                                {getFieldDecorator("heavyEye")(<CheckInput />)}
                            </Form.Item>
                        </div>
                    </Form>
                </React.Fragment>
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
