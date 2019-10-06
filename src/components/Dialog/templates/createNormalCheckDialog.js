import { Button, Form, Input, Radio } from "antd";
import { SickCheckItems, TextArea } from "components/form";
import React from "react";
import { createXDialog } from "../index";

const CheckInfoForm = Form.create({
    mapPropsToFields: (props) => {
        let fields = {};
        for (let name in props.data) {
            fields[name] = Form.createFormField({
                value: props.data[name]
            })
        }
        return fields;
    }
})(
    ({ form, onCancel }) => {
        const { getFieldDecorator, validateFieldsAndScroll } = form;

        function handleSubmit(e) {
            e.preventDefault();
            validateFieldsAndScroll((err, values) => {
                if (err) return;
                console.log(values);
            })
        }

        return <Form className="check-info-form" colon={false} layout="horizontal">
            <div className="check-info-row">
                <div className="left-eye-icon"></div>
                <div className="right-eye-icon"></div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item label="远">
                        {getFieldDecorator("left1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("left2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">裸眼视力</label>
                <div className="check-info-right">
                    <Form.Item label="远">
                        {getFieldDecorator("right1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("right2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("left10")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("left11")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("left12")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">电脑验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("right10")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("right11")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("right12")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("left7")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">瞳孔直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("right7")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("left8")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼压</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("right8")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("left24")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴长度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("right24")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("right9")(
                        <Radio.Group>
                            <div className="check-info-left">
                                <Radio value="0">OS</Radio>
                            </div>
                            <label className="check-info-label">主视眼</label>
                            <div className="check-info-right">
                                <Radio value="1">OD</Radio>
                            </div>
                        </Radio.Group>
                    )}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("sickNormalCheckItems")(<SickCheckItems />)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("left20")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼部检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("right20")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div>
                <Button onClick={onCancel}>关闭</Button>
                <Button type="primary" onClick={handleSubmit}>保存</Button>
            </div>
        </Form>
    }
)

function createCheckInfoDialog(data) {
    createXDialog({
        width: 700,
        children: ({ close }) => <CheckInfoForm data={data} onCancel={close} />
    })
}

export default createCheckInfoDialog;