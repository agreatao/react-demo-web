import { Button, DatePicker, Form, Input, Select } from "antd";
import { createXDialog } from "components/Dialog";
import { Address } from "components/form";
import moment from "moment";
import React from "react";
import { getRandomSickId } from "services/sickInfo";
import { computeAge } from "utils/age";
import { getFullChars } from "utils/pinyin";

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
    ({ form, onCancel, onSubmit, data }) => {
        const { getFieldDecorator, setFieldsValue } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                if (data && data.id) values.id = data.id;
                values.birthday = values.birthday && values.birthday.format("YYYY-MM-DD");
                onSubmit && onSubmit(values);
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
                                rules: [
                                    { required: true, message: "姓名是必填字段！" }
                                ],
                                onChange: (e) => {
                                    setFieldsValue({ sickChinaName: getFullChars(e.target.value) })
                                }
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item colon={false} label="拼音">
                            {getFieldDecorator("sickChinaName")(<Input autoComplete="off" disabled />)}
                        </Form.Item>
                        <Form.Item colon={false} label="性别">
                            {getFieldDecorator("sickSex", {
                                rules: [
                                    { required: true, message: "性别是必选字段！" }
                                ],
                            })(<Select style={{ width: 100 }}>
                                <Option value="1">男</Option>
                                <Option value="2">女</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item colon={false} label="出生年月">
                            {getFieldDecorator("birthday", {
                                rules: [
                                    { required: true, message: "出生年月是必选字段！" }
                                ],
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
                            {getFieldDecorator("address", {
                                rules: [
                                    { required: true, message: "地址是必填字段！" }
                                ],
                            })(<Address />)}
                        </Form.Item>
                        <Form.Item colon={false} label="联系方式">
                            {getFieldDecorator("mobilePhone", {
                                rules: [
                                    { required: true, message: "联系方式是必填字段！" }
                                ],
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
            </Form>
            <div className="x-dialog-footer">
                <Button onClick={onCancel}>取消</Button>
                <Button type="primary" onClick={handleSubmit}>保存</Button>
            </div>
        </React.Fragment>
    }
)

export default function createSickInfoDialog(data) {
    return new Promise((resolve) => {

        function show(data) {
            createXDialog({
                width: 700,
                title: data && data.id ? "编辑" : "新增",
                children: ({ close }) => <SickInfoForm onSubmit={data => {
                    resolve(data);
                    close();
                }} data={data} onCancel={close} />,
            })
        }

        if (data && typeof data.sickId === "string" && data.sickId != "") {
            show(data);
        } else {
            getRandomSickId().then(sickId => {
                show({ sickId });
            })
        }

    })

}