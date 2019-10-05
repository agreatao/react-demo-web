import { Button, Form, Input, Select, DatePicker , Radio} from "antd";
import { createXDialog } from "components/Dialog";
import React from "react";
import { CheckTextArea, Eye } from "components/form";
import { getFullChars } from "utils/pinyin";
import { computeAge } from "utils/age";
import moment from "moment";

const { Option } = Select;

const SickHistoryForm = Form.create({
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
    ({ form, onCancel, data }) => {
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
                        <Form.Item colon={false} label="视力减退">
                            {getFieldDecorator("sljt")(<Input autoComplete="off" />)}
                        </Form.Item>
                        {data && data.sickHistoryItems && data.sickHistoryItems.map((item, key) => <div key={key} className="sick-history-items">
                            <Form.Item colon={false} label="戴何种眼镜">
                                {getFieldDecorator(`sickHistoryItems[${key}].glassesType`)(<Select>
                                    {glassTypes.map(item => <Option value={item.value} key={item.value}>{item.text}</Option>)}
                                </Select>)}
                            </Form.Item>
                            <Form.Item colon={false} className="label-sm" label="戴镜">
                                {getFieldDecorator(`sickHistoryItems[${key}].glassesYear`)(<Input autoComplete="off" />)}
                            </Form.Item>
                            <Form.Item colon={false} className="label-sm" label="脱镜">
                                {getFieldDecorator(`sickHistoryItems[${key}].tjYear`)(<Input autoComplete="off" />)}
                            </Form.Item>
                            <Form.Item>
                                {data.sickHistoryItems.length - 1 === key && data.sickHistoryItems.length < 5 &&
                                    <a onClick={() => {
                                        const { data } = this.state;
                                        data.sickHistoryItems.push({});
                                        this.setState({ data });
                                    }}><Icon type="plus-circle" /></a>}
                                {data.sickHistoryItems.length - 1 > key && <a onClick={() => {
                                    const { data } = this.state;
                                    data.sickHistoryItems.splice(key, 1);
                                    this.setState({ data });
                                }}><Icon type="minus-circle" /></a>}
                            </Form.Item>
                        </div>)}
                        <Form.Item colon={false} label="基本稳定">
                            {getFieldDecorator("steadyYear")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item colon={false} className="eye-form-item" label="戴镜度数">
                            {getFieldDecorator("degreeL", {
                                initialValue: [
                                    data && data.degreeL1 || "0.00",
                                    data && data.degreeL2 || "0.00",
                                    data && data.degreeL3 || "0.00",
                                ]
                            })(<Eye label="左眼" />)}
                        </Form.Item>
                        <Form.Item colon={false} className="eye-form-item" label=" ">
                            {getFieldDecorator("degreeR", {
                                initialValue: [
                                    data && data.degreeL1 || "0.00",
                                    data && data.degreeL2 || "0.00",
                                    data && data.degreeL3 || "0.00",
                                ]
                            })(<Eye label="右眼" />)}
                        </Form.Item>
                        <div style={{ display: "flex" }}>
                            <Form.Item colon={false} label="角膜炎病史">
                                {getFieldDecorator("isJmybs", {
                                    initialValue: data && data.isJmybs
                                })(<Radio.Group >
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item colon={false} className="label-lg" label="严重干眼病史">
                                {getFieldDecorator("isYzgybs", {
                                    initialValue: data && data.isYzgybs
                                })(<Radio.Group >
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                        </div>
                        <Form.Item colon={false} label="家族近视">
                            {getFieldDecorator("glassFamily", {
                                initialValue: data && data.glassFamily
                            })(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1, marginLeft: 8 }}>
                        <Form.Item colon={false} className="label-lg" label="全身疾病史">
                            {getFieldDecorator("qsjbs", {
                                initialValue: [data && data.isQsjbs, data && data.qsjbsNote]
                            })(<CheckTextArea rows={5} max={300} />)}
                        </Form.Item>
                        <Form.Item colon={false} className="label-lg" label="精神性病史">
                            {getFieldDecorator("jsxbs", {
                                initialValue: [data && data.isJsxbs, data && data.jsxbsNote]
                            })(<CheckTextArea rows={5} max={300} />)}
                        </Form.Item>
                        <Form.Item colon={false} className="label-lg" label="手术史">
                            {getFieldDecorator("sss", {
                                initialValue: [data && data.isSss, data && data.sssNote]
                            })(<CheckTextArea rows={5} max={300} />)}
                        </Form.Item>
                        <Form.Item colon={false} className="label-lg" label="其他">
                            {getFieldDecorator("qt", {
                                initialValue: [data && data.isQt, data && data.qtNote]
                            })(<CheckTextArea rows={5} max={300} />)}
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

export default function createSickHistoryDialog(data) {
    createXDialog({
        width: 800,
        title: data && data.id ? "编辑" : "新增",
        children: ({ close }) => <SickHistoryForm data={data} onCancel={close} />
    })
}