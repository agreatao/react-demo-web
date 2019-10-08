import { Button, Form, Input, Radio } from "antd";
import { createXDialog } from "components/Dialog";
import { SickHistoryItems, TextArea } from "components/FormElem";
import moment from "moment";
import React from "react";
import { querySickHistory } from "services/sickHistory";
import "./createSickHistoryDialog.less";

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
    ({ form, onCancel, onSubmit }) => {
        const { getFieldDecorator } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                onSubmit && onSubmit(values);
            })
        }

        return <React.Fragment>
            <Form colon={false} className="sick-history-form">
                <div style={{ display: "flex", padding: "0 25px" }}>
                    <div style={{ flex: 1 }}>
                        <Form.Item label="视力减退">
                            {getFieldDecorator("sljt")(<Input autoComplete="off" className="normal-input" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("sickHistoryItems", {
                                initialValue: [{
                                    glassesType: null,
                                    glassesYear: null,
                                    tjYear: null
                                }]
                            })(<SickHistoryItems />)}
                        </Form.Item>
                        <Form.Item label="基本稳定">
                            {getFieldDecorator("steadyYear")(<Input autoComplete="off" className="normal-input" />)}
                        </Form.Item>
                        <Form.Item className="eye-form-item" label="戴镜度数">
                            <div className="degree">
                                <label>左眼</label>
                                <Form.Item>
                                    {getFieldDecorator("degreeL1", {
                                        initialValue: "0.00"
                                    })(<Input autoComplete="off" />)}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator("degreeL2", {
                                        initialValue: "0.00"
                                    })(<Input autoComplete="off" />)}
                                </Form.Item>
                                <span>/</span>
                                <Form.Item>
                                    {getFieldDecorator("degreeL3", {
                                        initialValue: "0.00"
                                    })(<Input autoComplete="off" />)}
                                </Form.Item>
                            </div>
                            <div className="degree">
                                <label>右眼</label>
                                <Form.Item>
                                    {getFieldDecorator("degreeR1", {
                                        initialValue: "0.00"
                                    })(<Input autoComplete="off" />)}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator("degreeR2", {
                                        initialValue: "0.00"
                                    })(<Input autoComplete="off" />)}
                                </Form.Item>
                                <span>/</span>
                                <Form.Item>
                                    {getFieldDecorator("degreeR3", {
                                        initialValue: "0.00"
                                    })(<Input autoComplete="off" />)}
                                </Form.Item>
                            </div>
                        </Form.Item>
                        <div style={{ display: "flex" }}>
                            <Form.Item label="角膜炎病史">
                                {getFieldDecorator("isJmybs")(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item label="严重干眼病史" className="long-label">
                                {getFieldDecorator("isYzgybs")(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                        </div>
                        <Form.Item label="家族近视">
                            {getFieldDecorator("glassFamily")(<Input autoComplete="off" className="normal-input" />)}
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1, marginLeft: 8 }}>
                        <Form.Item label="全身疾病史" className="bs">
                            <Form.Item>
                                {getFieldDecorator("isQsjbs")(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("qsjbsNote")(<TextArea row={4} max={300} />)}
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="精神性病史" className="bs">
                            <Form.Item>
                                {getFieldDecorator("isJsxbs")(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("jsxbsNote")(<TextArea row={4} max={300} />)}
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="手术史" className="bs">
                            <Form.Item>
                                {getFieldDecorator("isSss")(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("sssNote")(<TextArea row={4} max={300} />)}
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="其他" className="bs">
                            <Form.Item>
                                {getFieldDecorator("isQt")(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator("qtNote")(<TextArea row={4} max={300} />)}
                            </Form.Item>
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

export default function createSickHistoryDialog(data) {
    return new Promise((resolve) => {
        querySickHistory(data.id).then(_data => {
            createXDialog({
                width: 1000,
                title: "病史详情",
                children: ({ close }) => <SickHistoryForm data={_data} onCancel={close} onSubmit={sickHistory => {
                    if (_data && _data.id) sickHistory.id = _data.id;
                    else sickHistory.sickInfoId = data.id;
                    resolve(sickHistory);
                    close();
                }} />
            })
        })
    })
    
}