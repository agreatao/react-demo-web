import React from "react";
import http from "utils/http";
import { Form, Button, Input, Select, Radio, Icon } from "antd";
import { glassTypes } from "dic";
import { TextArea, Eye, CheckTextArea } from "components/form";
const { Option } = Select;
import "./sickHistory.less";

export default Form.create()(class SickHistory extends React.Component {
    state = {
        isEdit: false,
        data: null
    }
    componentDidMount() {
        const { sickInfoId } = this.props;
        http.get("/sick/querySickHistory", { params: { sickInfoId } }).then(data => {
            if (!data.result.sickHistoryItems || data.result.sickHistoryItems.length == 0) data.result.sickHistoryItems = [{}];
            this.setState({ data: data.result })
        })
    }
    handleClose = e => {
        e.preventDefault();
        this.props.form.resetFields();
        this.props.onCancel && this.props.onCancel();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            console.log(values);
        })
    }
    render() {
        const { isEdit, data } = this.state;
        const { getFieldDecorator } = this.props.form;
        return <Form className="sick-history-dialog-form">
            <div className="form-modal-title">病史</div>
            <div style={{ display: "flex", padding: "0 25px" }}>
                <div style={{ flex: 1 }}>
                    <Form.Item colon={false} label="视力减退">
                        {getFieldDecorator("sljt", {
                            initialValue: data && data.sljt
                        })(<Input autoComplete="off" disabled={!isEdit} />)}
                    </Form.Item>
                    {data && data.sickHistoryItems && data.sickHistoryItems.map((item, key) => <div key={key} className="sick-history-items">
                        <Form.Item colon={false} label="戴何种眼镜">
                            {getFieldDecorator(`sickHistoryItems[${key}].glassesType`, {
                                initialValue: item.glassesType
                            })(<Select disabled={!isEdit}>
                                {glassTypes.map(item => <Option value={item.value} key={item.value}>{item.text}</Option>)}
                            </Select>)}
                        </Form.Item>
                        <Form.Item colon={false} className="label-sm" label="戴镜">
                            {getFieldDecorator(`sickHistoryItems[${key}].glassesYear`, {
                                initialValue: item.glassesYear
                            })(<Input autoComplete="off" disabled={!isEdit} />)}
                        </Form.Item>
                        <Form.Item colon={false} className="label-sm" label="脱镜">
                            {getFieldDecorator(`sickHistoryItems[${key}].tjYear`, {
                                initialValue: item.tjYear
                            })(<Input autoComplete="off" disabled={!isEdit} />)}
                        </Form.Item>
                        <Form.Item>
                            {data.sickHistoryItems.length - 1 === key && data.sickHistoryItems.length < 5 &&
                                <a onClick={() => {
                                    const { data } = this.state;
                                    data.sickHistoryItems.push({});
                                    this.setState({ data });
                                }} disabled={!isEdit}><Icon type="plus-circle" /></a>}
                            {data.sickHistoryItems.length - 1 > key && <a onClick={() => {
                                const { data } = this.state;
                                data.sickHistoryItems.splice(key, 1);
                                this.setState({ data });
                            }} disabled={!isEdit}><Icon type="minus-circle" /></a>}
                        </Form.Item>
                    </div>)}
                    <Form.Item colon={false} label="基本稳定">
                        {getFieldDecorator("steadyYear", {
                            initialValue: data && data.steadyYear
                        })(<Input autoComplete="off" disabled={!isEdit} />)}
                    </Form.Item>
                    <Form.Item colon={false} className="eye-form-item" label="戴镜度数">
                        {getFieldDecorator("degreeL", {
                            initialValue: [
                                data && data.degreeL1 || "0.00",
                                data && data.degreeL2 || "0.00",
                                data && data.degreeL3 || "0.00",
                            ]
                        })(<Eye label="左眼" disabled={!isEdit} />)}
                    </Form.Item>
                    <Form.Item colon={false} className="eye-form-item" label=" ">
                        {getFieldDecorator("degreeR", {
                            initialValue: [
                                data && data.degreeL1 || "0.00",
                                data && data.degreeL2 || "0.00",
                                data && data.degreeL3 || "0.00",
                            ]
                        })(<Eye label="右眼" disabled={!isEdit} />)}
                    </Form.Item>
                    <div style={{ display: "flex" }}>
                        <Form.Item colon={false} label="角膜炎病史">
                            {getFieldDecorator("isJmybs", {
                                initialValue: data && data.isJmybs
                            })(<Radio.Group disabled={!isEdit}>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </Radio.Group>)}
                        </Form.Item>
                        <Form.Item colon={false} className="label-lg" label="严重干眼病史">
                            {getFieldDecorator("isYzgybs", {
                                initialValue: data && data.isYzgybs
                            })(<Radio.Group disabled={!isEdit}>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </Radio.Group>)}
                        </Form.Item>
                    </div>
                    <Form.Item colon={false} label="家族近视">
                        {getFieldDecorator("glassFamily", {
                            initialValue: data && data.glassFamily
                        })(<Input autoComplete="off" disabled={!isEdit} />)}
                    </Form.Item>
                </div>
                <div style={{ flex: 1, marginLeft: 8 }}>
                    <Form.Item colon={false} className="label-lg" label="全身疾病史">
                        {getFieldDecorator("qsjbs", {
                            initialValue: [data && data.isQsjbs, data && data.qsjbsNote]
                        })(<CheckTextArea disabled={!isEdit} rows={5} max={300} />)}
                    </Form.Item>
                    <Form.Item colon={false} className="label-lg" label="精神性病史">
                        {getFieldDecorator("jsxbs", {
                            initialValue: [data && data.isJsxbs, data && data.jsxbsNote]
                        })(<CheckTextArea disabled={!isEdit} rows={5} max={300} />)}
                    </Form.Item>
                    <Form.Item colon={false} className="label-lg" label="手术史">
                        {getFieldDecorator("sss", {
                            initialValue: [data && data.isSss, data && data.sssNote]
                        })(<CheckTextArea disabled={!isEdit} rows={5} max={300} />)}
                    </Form.Item>
                    <Form.Item colon={false} className="label-lg" label="其他">
                        {getFieldDecorator("qt", {
                            initialValue: [data && data.isQt, data && data.qtNote]
                        })(<CheckTextArea disabled={!isEdit} rows={5} max={300} />)}
                    </Form.Item>
                </div>
            </div>
            <div className="form-modal-button">
                {
                    !isEdit ? <React.Fragment>
                        <Button type="primary" onClick={e => this.setState({ isEdit: true })}>编辑</Button>
                        <Button onClick={this.handleClose}>关闭</Button>
                    </React.Fragment> :
                        <React.Fragment>
                            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                            <Button onClick={this.handleClose}>取消</Button>
                        </React.Fragment>
                }
            </div>
        </Form>
    }
})