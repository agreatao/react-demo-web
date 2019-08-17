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
        state = {
            history: null
        }
        componentDidMount() {
            this.props.onInit && this.props.onInit();
            if (!this.props.data)
                http.get("/sick/getRandomSickId").then(data => {
                    this.props.form.setFieldsValue({
                        sickId: data.result
                    })
                })
            else {
                http.post("/sick/querySickHistory", { sickInfoId: this.props.data.sickId }).then(history => {
                    this.setState({ history: history.result })
                })
            }
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
            const { history } = this.state;
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
                                        })(<Input disabled autoComplete="off" />)}
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="出生年月">
                                        <DatePicker style={{ width: "100%" }}
                                            onChange={birthday => {
                                                console.log(getAge(birthday.format("YYYY-MM-DD")))
                                                this.props.form.setFieldsValue({
                                                    sickAge: getAge(birthday.format("YYYY-MM-DD")) || 0
                                                })
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="姓名">
                                        {getFieldDecorator("sickName", {
                                            initialValue: data && data.sickName
                                        })(<Input autoComplete="off" />)}
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="年龄">
                                        {getFieldDecorator("sickAge", {
                                            initialValue: data && data.sickAge
                                        })(<Input autoComplete="off" disabled />)}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="姓名拼音">
                                        {getFieldDecorator("sickChinaName", {
                                            initialValue: data && data.sickChinaName
                                        })(<Input autoComplete="off" disabled={data?true:false} />)}
                                        {/*<Input
                                            disabled
                                            value={getFullChars(
                                                getFieldValue("sickChinaName")
                                            )}
                                        />*/}
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="联系方式">
                                        {getFieldDecorator("mobilePhone", {
                                            initialValue: data && data.mobilePhone
                                        })(<Input autoComplete="off" />)}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="性别">
                                        {getFieldDecorator("sickSex", {
                                            initialValue: data && data.sickSex
                                        })(<Select>
                                            <Option value="男">男</Option>
                                            <Option value="女">女</Option>
                                        </Select>)}
                                    </Form.Item>
                                </div>
                                <div className="form-col">
                                    <Form.Item label="职业">
                                        {getFieldDecorator("work", {
                                            initialValue: data && data.work
                                        })(<Input autoComplete="off" />)}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="身份证">
                                        {getFieldDecorator("chinaId", {
                                            initialValue: data && data.chinaId
                                        })(<Input autoComplete="off" />)}
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
                                        {getFieldDecorator("sljt", {
                                            initialValue: history && history.sljt
                                        })(<Input autoComplete="off" />)}
                                    </Form.Item>
                                </div>
                                <div className="form-col flex-1">
                                    <div className="form-row sub-form-item">
                                        <Form.Item label="眼睛">
                                            <Select style={{ width: 125 }}>
                                                <Option value="框架眼镜">框架眼镜</Option>
                                                <Option value="软片隐形眼镜">软片隐形眼镜</Option>
                                                <Option value="RGP">RGP</Option>
                                                <Option value="OK镜">OK镜</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="戴镜">
                                            <Input autoComplete="off" />
                                        </Form.Item>
                                        <Form.Item label="脱镜">
                                            <Input autoComplete="off" />
                                        </Form.Item>
                                        <a className="control-btn"><Icon type="minus-circle" /></a>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="form-row">
                                <div className="form-col">
                                    <Form.Item label="基本稳定">
                                        {getFieldDecorator("steadyYear", {
                                            initialValue: history && history.steadyYear
                                        })(<Input autoComplete="off" />)}
                                    </Form.Item>
                                </div>
                                <div className="form-col flex-1">
                                    <div className="form-row sub-form-item">
                                        <Form.Item label="左眼">
                                            {getFieldDecorator("degreeL", {
                                                initialValue: history && [history.degreeL1, history.degreeL2, history.degreeL3],
                                            })(<Inputs />)}
                                        </Form.Item>
                                        <Form.Item label="右眼">
                                            {getFieldDecorator("degreeR", {
                                                initialValue: history && [history.degreeR1, history.degreeR2, history.degreeR3]
                                            })(<Inputs />)}
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <Form.Item label="严重干眼病史">
                                {getFieldDecorator("bool1", {
                                    initialValue: history && history.bool1
                                })(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="角膜炎病史">
                                {getFieldDecorator("bool2", {
                                    initialValue: history && history.bool2
                                })(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="家族病史">
                                {getFieldDecorator("glassFamily", {
                                    initialValue: history && history.glassFamily
                                })(
                                    <Select style={{ width: 100 }}>
                                        <Option value="父亲">父亲</Option>
                                        <Option value="母亲">母亲</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <hr />
                            <Form.Item label="全身疾病史">
                                {getFieldDecorator("bool3", {
                                    initialValue: history && history.bool3
                                })(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="精神性病史">
                                {getFieldDecorator("bool4", {
                                    initialValue: history && history.bool4
                                })(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="手术史">
                                {getFieldDecorator("bool5", {
                                    initialValue: history && history.bool5
                                })(<CheckInput />)}
                            </Form.Item>
                            <Form.Item label="其他">
                                {getFieldDecorator("bool6", {
                                    initialValue: history && history.bool6
                                })(<CheckInput />)}
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
