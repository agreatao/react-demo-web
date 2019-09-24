import { Button, Form, Input } from "antd";
import { dialog } from "components/alert";
import React from "react";
import AppointRegister from "./appointReigster";

export const appointRegisterDialog = data =>
    new Promise(resolve => {
        const { close } = dialog(<AppointRegister data={data} onSuccess={handleSuccess} onCancel={handleCancel} />, {
            width: 560
        });

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
                    <Form.Item label="安排诊室">
                        {getFieldDecorator("room", {})(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="医生">
                        {getFieldDecorator("doctorId", {})(<Input autoComplete="off" disabled={!!data} />)}
                    </Form.Item>
                    <div className="dialog-button">
                        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
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
