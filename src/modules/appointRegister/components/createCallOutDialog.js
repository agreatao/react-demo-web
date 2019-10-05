import { Button, Form, Input, Descriptions, Select } from "antd";
import { createXDialog } from "components/Dialog";
import React from "react";

const { Option } = Select;

const CallOutForm = Form.create({
    mapPropsToFields: props => {
        let fields = {};
        for (let name in props.data) {
            fields[name] = Form.createFormField({
                value: props.data[name]
            })
        }
        return fields;
    }
})(
    ({ form, onCancel, data }) => {
        const { getFieldDecorator } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
            })
        }

        console.log(data);

        return <React.Fragment>
            <Descriptions title="患者基本信息" column={2}>
                <Descriptions.Item label="姓名">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="联系方式">1810000000</Descriptions.Item>
                <Descriptions.Item label="地址" span={2}>Hangzhou, Zhejiang</Descriptions.Item>
            </Descriptions>
            <Form layout="inline">
                <Form.Item label="诊室">
                    {getFieldDecorator("room")(<Select>
                        <Option value="1">诊室一</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item>
                    <Input disabled={true} placeholder="今日医生" />
                </Form.Item>
                <Form.Item>
                    <Button onClick={onCancel}>关闭</Button>
                    <Button type="primary" onClick={handleSubmit}>保存</Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    }
)

export default function createCallOutDialog(data) {
    createXDialog({
        title: "叫号",
        children: ({ close }) => <CallOutForm data={data} onCancel={close} />
    })
}