import { Button, Form, Input, Radio, Select } from "antd";
import { SickCheckItems, TextArea } from "components/FormElem";
import { getSpecialCheck } from "services/sickSpecialCheck";
import React from "react";
import { createXDialog } from "../index";

const { Option } = Select;

const SpecialJsjg = Form.create({
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
    ({ form, onCancel, onSubmit, data }) => {
        const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;
        console.log(data);
        function handleSubmit(e) {
            e.preventDefault();
            validateFieldsAndScroll((err, values) => {
                if (err) return;
                if (data.id) values.id = data.id;
                onSubmit && onSubmit(values);
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
                        {getFieldDecorator("laa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("laa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">裸眼视力</label>
                <div className="check-info-right">
                    <Form.Item label="远">
                        {getFieldDecorator("raa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("raa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lba1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lba2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lba3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">电脑验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rb1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rb2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rb3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">瞳孔直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼压</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("lc")(
                        <Radio.Group>
                            <div className="check-info-left">
                                <Radio value={0}>OS</Radio>
                            </div>
                            <label className="check-info-label">主视眼</label>
                            <div className="check-info-right">
                                <Radio value={1}>OD</Radio>
                            </div>
                        </Radio.Group>
                    )}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("lda1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lda1")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("lda2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("lda3")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lda3")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("lda1") + 337.5 / getFieldValue("lda3")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="HVID" className="hvid">
                            {getFieldDecorator("lda4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="X">
                            {getFieldDecorator("lda6")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Y">
                            {getFieldDecorator("lda7")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Ø">
                            {getFieldDecorator("lda8")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("lda5")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">角膜地形图</label>
                <div className="check-info-right jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("rda1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rda1")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("rda2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("rda3")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rda3")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("rda1") + 337.5 / getFieldValue("rda3")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="HVID" className="hvid">
                            {getFieldDecorator("rda4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="X">
                            {getFieldDecorator("rda6")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Y">
                            {getFieldDecorator("rda7")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Ø">
                            {getFieldDecorator("rda8")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("rda5")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("specialJsjgItems", {
                        initialValue: [{}]
                    })(<SickCheckItems />)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼部检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("ll")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">角膜厚度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rl")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴长度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lna1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lna2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lna3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">散瞳验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rna1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rna2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rna3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item label="是否修正" className="lb">
                    {getFieldDecorator("lp")(<Select>
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lo")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼底检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("ro")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="x-dialog-footer">
                <Button onClick={onCancel}>关闭</Button>
                <Button type="primary" onClick={handleSubmit}>保存</Button>
            </div>
        </Form>
    }
)

const SpecialIcl = Form.create({
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
    ({ form, onCancel, onSubmit, data }) => {
        const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;
        console.log(data);
        function handleSubmit(e) {
            e.preventDefault();
            validateFieldsAndScroll((err, values) => {
                if (err) return;
                if (data.id) values.id = data.id;
                onSubmit && onSubmit(values);
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
                        {getFieldDecorator("laa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("laa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">裸眼视力</label>
                <div className="check-info-right">
                    <Form.Item label="远">
                        {getFieldDecorator("raa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("raa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lba1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lba2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lba3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">电脑验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rb1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rb2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rb3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">瞳孔直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼压</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("lc")(
                        <Radio.Group>
                            <div className="check-info-left">
                                <Radio value={0}>OS</Radio>
                            </div>
                            <label className="check-info-label">主视眼</label>
                            <div className="check-info-right">
                                <Radio value={1}>OD</Radio>
                            </div>
                        </Radio.Group>
                    )}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("lda1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lda1")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("lda2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("lda3")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lda3")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("lda1") + 337.5 / getFieldValue("lda3")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="HVID" className="hvid">
                            {getFieldDecorator("lda4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="X">
                            {getFieldDecorator("lda6")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Y">
                            {getFieldDecorator("lda7")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Ø">
                            {getFieldDecorator("lda8")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("lda5")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">角膜地形图</label>
                <div className="check-info-right jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("rda1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rda1")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("rda2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("rda3")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rda3")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("rda1") + 337.5 / getFieldValue("rda3")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="HVID" className="hvid">
                            {getFieldDecorator("rda4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="X">
                            {getFieldDecorator("rda6")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Y">
                            {getFieldDecorator("rda7")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Ø">
                            {getFieldDecorator("rda8")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("rda5")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("specialJsjgItems", {
                        initialValue: [{}]
                    })(<SickCheckItems />)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼部检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("ll")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">角膜厚度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rl")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴长度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lna1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lna2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lna3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">散瞳验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rna1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rna2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rna3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item label="是否修正" className="lb">
                    {getFieldDecorator("lp")(<Select>
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lo")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼底检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("ro")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="x-dialog-footer">
                <Button onClick={onCancel}>关闭</Button>
                <Button type="primary" onClick={handleSubmit}>保存</Button>
            </div>
        </Form>
    }
)

const SpecialJmjcj = Form.create({
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
    ({ form, onCancel, onSubmit, data }) => {
        const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;
        console.log(data);
        function handleSubmit(e) {
            e.preventDefault();
            validateFieldsAndScroll((err, values) => {
                if (err) return;
                if (data.id) values.id = data.id;
                onSubmit && onSubmit(values);
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
                        {getFieldDecorator("laa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("laa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">裸眼视力</label>
                <div className="check-info-right">
                    <Form.Item label="远">
                        {getFieldDecorator("raa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("raa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lba1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lba2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lba3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">电脑验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rb1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rb2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rb3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">瞳孔直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼压</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("lc")(
                        <Radio.Group>
                            <div className="check-info-left">
                                <Radio value={0}>OS</Radio>
                            </div>
                            <label className="check-info-label">主视眼</label>
                            <div className="check-info-right">
                                <Radio value={1}>OD</Radio>
                            </div>
                        </Radio.Group>
                    )}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("lda1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lda1")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("lda2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("lda3")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lda3")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("lda1") + 337.5 / getFieldValue("lda3")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="HVID" className="hvid">
                            {getFieldDecorator("lda4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="X">
                            {getFieldDecorator("lda6")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Y">
                            {getFieldDecorator("lda7")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Ø">
                            {getFieldDecorator("lda8")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("lda5")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">角膜地形图</label>
                <div className="check-info-right jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("rda1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rda1")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("rda2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("rda3")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rda3")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("rda1") + 337.5 / getFieldValue("rda3")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="HVID" className="hvid">
                            {getFieldDecorator("rda4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="X">
                            {getFieldDecorator("rda6")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Y">
                            {getFieldDecorator("rda7")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Ø">
                            {getFieldDecorator("rda8")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("rda5")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("specialJsjgItems", {
                        initialValue: [{}]
                    })(<SickCheckItems />)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼部检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("ll")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">角膜厚度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rl")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴长度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lna1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lna2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lna3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">散瞳验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("rna1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rna2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rna3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item label="是否修正" className="lb">
                    {getFieldDecorator("lp")(<Select>
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lo")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼底检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("ro")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="x-dialog-footer">
                <Button onClick={onCancel}>关闭</Button>
                <Button type="primary" onClick={handleSubmit}>保存</Button>
            </div>
        </Form>
    }
)

const CheckInfoForm = {
    "1": SpecialJsjg,
    "2": SpecialIcl,
    "3": SpecialJmjcj
}

function createCheckInfoDialog(data, resolve) {
    const CheckInfo = CheckInfoForm[data.reportType];
    getSpecialCheck({ specialId: data.id, reportType: data.reportType })
        .then(_data => {
            createXDialog({
                title: "特殊检查",
                width: 700,
                children: ({ close }) => <CheckInfo data={_data} onCancel={close} onSubmit={checkData => {
                    typeof data === "function" ? data(checkData, { close }) : resolve && resolve(checkData, { close });
                }} />
            })
        })
}

export default createCheckInfoDialog;