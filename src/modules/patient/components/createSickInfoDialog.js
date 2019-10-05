import { Button, Form, Input, Select, DatePicker } from "antd";
import { createXDialog } from "components/Dialog";
import React from "react";
import { Address } from "components/form";
import { getFullChars } from "utils/pinyin";
import { computeAge } from "utils/age";
import moment from "moment";

const { Option } = Select;

const SickInfoForm = Form.create({
    mapPropsToFields: props => {
        let fields = {};
        for (let name in props.data) {
            fields[name] = Form.createFormField({
                value: name === "birthday" ? moment(props.data[name], "YYYY-MM-DD") : props.data[name]
            })
        }
        return fields;
    }
})(
    ({ form, onCancel }) => {
        const { getFieldDecorator, setFieldsValue } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
            })
        }

        return <React.Fragment>
            <Form>
                <div style={{ display: "flex", padding: "0 25px" }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item colon={false} label="病历号">
                            {getFieldDecorator("sickId")(<Input autoComplete="off" disabled />)}
                        </Form.Item>
                        <Form.Item colon={false} label="姓名">
                            {getFieldDecorator("sickName", {
                                onChange: (e) => {
                                    setFieldsValue({ sickChinaName: getFullChars(e.target.value) })
                                }
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item colon={false} label="拼音">
                            {getFieldDecorator("sickChinaName")(<Input autoComplete="off" disabled />)}
                        </Form.Item>
                        <Form.Item colon={false} label="性别">
                            {getFieldDecorator("sickSex")(<Select>
                                <Option value="1">男</Option>
                                <Option value="2">女</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item colon={false} label="出生年月">
                            {getFieldDecorator("birthday", {
                                onChange: value => {
                                    setFieldsValue({ sickAge: computeAge(value.toDate()) })
                                }
                            })(<DatePicker format="YYYY-MM-DD" />)}
                        </Form.Item>
                        <Form.Item colon={false} label="年龄">
                            {getFieldDecorator("sickAge")(<Input autoComplete="off" disabled />)}
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1, marginLeft: 8 }}>
                        <Form.Item colon={false} label="职业">
                            {getFieldDecorator("work")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item colon={false} label="地址">
                            {getFieldDecorator("address")(<Address />)}
                        </Form.Item>
                        <Form.Item colon={false} label="联系方式">
                            {getFieldDecorator("mobilePhone")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
            </Form>
            <div>
                <Button onClick={onCancel}>取消</Button>
                <Button type="primary" onClick={handleSubmit}>保存</Button>
            </div>
        </React.Fragment>
    }
)

export default function createSickInfoDialog(data) {
    createXDialog({
        width: 800,
        title: data && data.id ? "编辑" : "新增",
        children: ({ close }) => <SickInfoForm data={data} onCancel={close} />
    })
}