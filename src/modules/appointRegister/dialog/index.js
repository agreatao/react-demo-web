import { Button, DatePicker, Form, Input, Select } from "antd";
import { dialog } from "components/alert";
import { TextArea } from "components/form";
import { appointTimes } from "lib/dic";
import React from "react";
import http from "utils/http";

const { Option } = Select;

const layout = {
    labelCol: {
        sm: { span: 6 }
    },
    wrapperCol: {
        sm: { span: 16 }
    },
    colon: false
};

const AddOrEditForm = Form.create()(
    class AddOrEditForm extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
                http.post("/appoint/appointRegister", values).then(data => {
                    this.props.onSuccess && this.props.onSuccess();
                });
            });
        };
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onCancel && this.props.onCancel();
        };
        render() {
            const { data } = this.props;
            const { getFieldDecorator } = this.props.form;
            return (
                <Form>
                    <div className="form-modal-title">{data ? "修改" : "新增"}挂号预约</div>
                    <Form.Item {...layout} label="手机">
                        {getFieldDecorator("phone", {})(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item {...layout} label="姓名">
                        {getFieldDecorator("name", {})(<Input autoComplete="off" disabled={!!data} />)}
                    </Form.Item>
                    <Form.Item {...layout} label="预约时间">
                        {getFieldDecorator("appointDate", {})(<DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />)}
                    </Form.Item>
                    <Form.Item {...layout} label="时间段">
                        {getFieldDecorator("appointTime", {})(
                            <Select>
                                {appointTimes.map(item => (
                                    <Option value={item.value} key={item.value}>
                                        {item.text}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...layout} label="预约医生">
                        {getFieldDecorator("doctorId", {})(
                            <Select>
                                <Option value="">未指定医生</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...layout} label="备注">
                        {getFieldDecorator("remark", {})(<TextArea max={100} rows={5} />)}
                    </Form.Item>
                    <div className="form-modal-button">
                        <Button type="primary" onClick={this.handleSubmit}>
                            {data ? "修改" : "保存"}
                        </Button>
                        <Button onClick={this.handleReset}>取消</Button>
                    </div>
                </Form>
            );
        }
    }
);

export const addOrEdit = data =>
    new Promise(resolve => {
        const { close } = dialog(<AddOrEditForm data={data} onSuccess={handleSuccess} onCancel={handleCancel} />);

        function handleSuccess() {
            close();
            resolve();
        }

        function handleCancel() {
            close();
        }
    });

const ToQueueForm = Form.create()(
    class ToQueueForm extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
                this.props.onSuccess && this.props.onSuccess();
            });
        };
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onCancel && this.props.onCancel();
        };
        render() {
            const { data } = this.props;
            const { getFieldDecorator } = this.props.form;
            return (
                <Form>
                    <div className="dialog-title">叫号</div>
                    <Form.Item {...layout} label="安排诊室">
                        {getFieldDecorator("room", {})(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item {...layout} label="医生">
                        {getFieldDecorator("doctorId", {})(<Input autoComplete="off" disabled={!!data} />)}
                    </Form.Item>
                    <div className="dialog-button">
                        <Button type="primary" onClick={this.handleSubmit}>
                            确定
                        </Button>
                        <Button onClick={this.handleReset}>取消</Button>
                    </div>
                </Form>
            );
        }
    }
);

export const toQueue = data =>
    new Promise(resolve => {
        const { close } = dialog(<ToQueueForm data={data} onSuccess={handleSuccess} onCancel={handleCancel} />);

        function handleSuccess() {
            close();
            resolve();
        }

        function handleCancel() {
            close();
        }
    });
