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
                        {getFieldDecorator("raa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("raa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">裸眼视力</label>
                <div className="check-info-right">
                    <Form.Item label="远">
                        {getFieldDecorator("laa1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("laa2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
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
                <label className="check-info-label">电脑验光</label>
                <div className="check-info-right">
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
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">瞳孔直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lbb")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼压</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lbc")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
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
                <label className="check-info-label">角膜地形图</label>
                <div className="check-info-right jmdxt">
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
                        {getFieldDecorator("rk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼部检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lk")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rl")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">角膜厚度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("ll")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴长度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lm")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
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
                <label className="check-info-label">散瞳验光</label>
                <div className="check-info-right">
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
                        {getFieldDecorator("ro")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼底检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lo")(<TextArea max={100} rows={4} />)}
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
                        {getFieldDecorator("ra1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("ra2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">裸眼视力</label>
                <div className="check-info-right">
                    <Form.Item label="远">
                        {getFieldDecorator("la1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("la2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rc1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rc2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rc3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">电脑验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lc1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lc2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lc3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rd")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">瞳孔直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("ld")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("ree")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼压</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lee")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("eyetype")(
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
                            {getFieldDecorator("rf")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rf")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("rg")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("rh")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("rh")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("rf") + 337.5 / getFieldValue("rh")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">角膜地形图</label>
                <div className="check-info-right jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("lf")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rs">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lf")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="@">
                            {getFieldDecorator("lg")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("lh")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Rf">
                            <Input autoComplete="off" disabled value={(337.5 / getFieldValue("lh")).toFixed(2)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="R">
                            <Input autoComplete="off" disabled value={((337.5 / getFieldValue("lf") + 337.5 / getFieldValue("lh")) / 2).toFixed(2)} />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rk")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">前房深度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lk")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <div>
                        <Form.Item label="内皮数" className="lb">
                            {getFieldDecorator("rl1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="百分比" className="lb">
                            {getFieldDecorator("rl2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">角膜内皮</label>
                <div className="check-info-right">
                    <div>
                        <Form.Item label="内皮数" className="lb">
                            {getFieldDecorator("ll1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="百分比" className="lb">
                            {getFieldDecorator("ll2")(<Input autoComplete="off" />)}
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
                        {getFieldDecorator("a1")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼部检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("a2")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rq")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">角膜厚度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lq")(<Input className="mm" autoComplete="off" suffix="um" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rr")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴长度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lr")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <div className="check-info-ubm">
                        <Form.Item className="ubm-1">
                            {getFieldDecorator("rt1")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item className="ubm-2">
                            {getFieldDecorator("rt2")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item className="ubm-3">
                            {getFieldDecorator("rt3")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item className="ubm-4">
                            {getFieldDecorator("rt4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="角膜横径" className="lb">
                            {getFieldDecorator("ru")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">UBM</label>
                <div className="check-info-right">
                    <div className="check-info-ubm">
                        <Form.Item className="ubm-1">
                            {getFieldDecorator("lt1")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item className="ubm-2">
                            {getFieldDecorator("lt2")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item className="ubm-3">
                            {getFieldDecorator("lt3")(<Input autoComplete="off" />)}
                        </Form.Item>
                        <Form.Item className="ubm-4">
                            {getFieldDecorator("lt4")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="角膜横径" className="lb">
                            {getFieldDecorator("lu")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item label="H">
                        {getFieldDecorator("rv")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="V">
                        {getFieldDecorator("rw")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">沟到沟</label>
                <div className="check-info-right">
                    <Form.Item label="H">
                        {getFieldDecorator("lv")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="V">
                        {getFieldDecorator("lw")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rx1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rx2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rx3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">散瞳验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lx1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lx2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lx3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item label="是否修正" className="lb">
                    {getFieldDecorator("a3")(<Select style={{ width: 60 }}>
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
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("a4")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">确定度数</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("a5")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <label className="check-info-label">注释</label>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("a5")(<TextArea max={100} rows={4} />)}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("lo")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">检查评估结论</label>
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
                        {getFieldDecorator("ra1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("ra2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">裸眼视力</label>
                <div className="check-info-right">
                    <Form.Item label="远">
                        {getFieldDecorator("la1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="近">
                        {getFieldDecorator("la2")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rc1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rc2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rc3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">电脑验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lc1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lc2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lc3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rd")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">角膜直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("ld")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("ree")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">瞳孔直径</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lee")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rf")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼压</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lf")(<Input className="mmHg" autoComplete="off" suffix="mmHg" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item>
                    {getFieldDecorator("eyetype")(
                        <Radio.Group>
                            <div className="check-info-left">
                                <Radio value={1}>OS</Radio>
                            </div>
                            <label className="check-info-label">主视眼</label>
                            <div className="check-info-right">
                                <Radio value={0}>OD</Radio>
                            </div>
                        </Radio.Group>
                    )}
                </Form.Item>
            </div>
            <div className="check-info-row">
                <div className="check-info-left jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("rl")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("rm")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("rn")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e2">
                            {getFieldDecorator("rg1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">角膜形态</label>
                <div className="check-info-right jmdxt">
                    <div>
                        <Form.Item label="Ks">
                            {getFieldDecorator("ll")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Kf">
                            {getFieldDecorator("lm")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e">
                            {getFieldDecorator("ln")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="e2">
                            {getFieldDecorator("lg1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <div>
                        <Form.Item label="内皮数" className="lb">
                            {getFieldDecorator("rl1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="百分比" className="lb">
                            {getFieldDecorator("rl2")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                </div>
                <label className="check-info-label">角膜内皮</label>
                <div className="check-info-right">
                    <div>
                        <Form.Item label="内皮数" className="lb">
                            {getFieldDecorator("ll1")(<Input autoComplete="off" />)}
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="百分比" className="lb">
                            {getFieldDecorator("ll2")(<Input autoComplete="off" />)}
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
                        {getFieldDecorator("rj1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("rj2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("rj3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">散瞳验光</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lj1")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("lj2")(<Input autoComplete="off" />)}
                    </Form.Item>
                    <span className="check-info-span">X</span>
                    <Form.Item>
                        {getFieldDecorator("lj3")(<Input autoComplete="off" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rk")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴长度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lk")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rh1")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼轴厚度</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lh1")(<Input className="mm" autoComplete="off" suffix="mm" />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <div className="check-info-left">
                    <Form.Item>
                        {getFieldDecorator("rb1")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
                <label className="check-info-label">眼部检查</label>
                <div className="check-info-right">
                    <Form.Item>
                        {getFieldDecorator("lb1")(<TextArea max={100} rows={4} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="check-info-row">
                <Form.Item label="试戴评估" className="lb">
                    {getFieldDecorator("istry")(<Select>
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>)}
                </Form.Item>
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