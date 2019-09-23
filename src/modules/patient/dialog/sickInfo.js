import { Button, Form, Input, Select, DatePicker } from "antd";
import React from "react";
import moment from "moment";
import { Address } from "components/form";
import http from "utils/http";
import { getFullChars } from "utils/pinyin";
import { computeAge } from "utils/age";


const { Option } = Select;

export default Form.create()(
    class SickInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: props.data
            }
        }
        componentDidMount() {
            const { data } = this.state;
            if (!data) {
                http.get("/sick/getRandomSickId").then(data => {
                    this.setState({
                        data: {
                            sickId: data.result
                        }
                    })
                })
            }
        }
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                const { data } = this.state;
                values.birthday = values.birthday.format("YYYY-MM-DD");
                http.post(data ? "/sick/updateSickInfo" : "/sick/addSickInfo", {
                    id: data.id,
                    ...values,
                }).then(() => {
                    this.props.onSuccess && this.props.onSuccess();
                })
            })
        }
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onCancel && this.props.onCancel();
        }
        render() {
            const { data } = this.state;
            const { getFieldDecorator } = this.props.form;
            return <Form className="sick-info-dialog-form">
                <div className="form-modal-title">{data != null ? "编辑患者" : "新增患者"}</div>
                <div style={{ display: "flex", padding: "0 25px" }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item colon={false} label="病历号">
                            {getFieldDecorator("sickId", {
                                initialValue: data && data.sickId
                            })(<Input autoComplete="off" disabled />)}
                        </Form.Item>
                        <Form.Item colon={false} label="姓名">
                            {getFieldDecorator("sickName", {
                                initialValue: data && data.sickName,
                                onChange: (e) => {
                                    this.props.form.setFieldsValue({ sickChinaName: getFullChars(e.target.value) })
                                }
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item colon={false} label="拼音">
                            {getFieldDecorator("sickChinaName", {
                                initialValue: data && data.sickChinaName
                            })(<Input autoComplete="off" disabled />)}
                        </Form.Item>
                        <Form.Item colon={false} label="性别">
                            {getFieldDecorator("sickSex", {
                                initialValue: data && data.sickSex
                            })(<Select>
                                <Option value="1">男</Option>
                                <Option value="2">女</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item colon={false} label="出生年月">
                            {getFieldDecorator("birthday", {
                                initialValue: data && data.birthday && moment(data.birthday, "YYYY-MM-DD"),
                                onChange: value => {
                                    this.props.form.setFieldsValue({ sickAge: computeAge(value.toDate()) })
                                }
                            })(<DatePicker format="YYYY-MM-DD" />)}
                        </Form.Item>
                        <Form.Item colon={false} label="年龄">
                            {getFieldDecorator("sickAge", {
                                initialValue: data && data.sickAge
                            })(<Input autoComplete="off" disabled />)}
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1, marginLeft: 8 }}>
                        <Form.Item colon={false} label="职业">
                            {getFieldDecorator("work", {
                                initialValue: data && data.work
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item colon={false} label="地址">
                            {getFieldDecorator("address", {
                                initialValue: data && data.address
                            })(<Address />)}
                        </Form.Item>
                        <Form.Item colon={false} label="联系方式">
                            {getFieldDecorator("mobilePhone", {
                                initialValue: data && data.mobilePhone
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <div className="form-modal-button">
                    <Button type="primary" onClick={this.handleSubmit}>{data ? "修改" : "保存"}</Button>
                    <Button onClick={this.handleReset}>返回</Button>
                </div>
            </Form>
        }
    }
);