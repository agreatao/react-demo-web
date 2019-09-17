import { dialog } from "components/alert";
import { Form, Input, DatePicker, Select, Button } from "antd";
import React from "react";

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
            return <Form>
                <div className="form-modal-title">{data ? "修改" : "新增"}手术预约</div>
                <Form.Item {...layout} label="手机">
                    {getFieldDecorator("phone", {})(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...layout} label="姓名">
                    {getFieldDecorator("name", {})(<Input autoComplete="off" disabled={!!data} />)}
                </Form.Item>
                <Form.Item {...layout} label="预约时间">
                    {getFieldDecorator("appointTime", {})(<DatePicker showTime={{ format: "HH:mm" }} style={{ width: "100%" }} />)}
                </Form.Item>
                <Form.Item {...layout} label="预约医生">
                    {getFieldDecorator("doctorId", {})(
                        <Select>
                            <Option value="">请选择</Option>
                        </Select>
                    )}
                </Form.Item>
                <div className="form-modal-button">
                    <Button type="primary" onClick={this.handleSubmit}>{data ? "修改" : "保存"}</Button>
                    <Button onClick={this.handleReset}>取消</Button>
                </div>
            </Form>
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