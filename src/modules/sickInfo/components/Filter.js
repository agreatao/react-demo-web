import { Button, Form, Input } from "antd";
import React from "react";

export const SickInfoFilter = Form.create()(
    ({ form, onFilter }) => {
        const { getFieldDecorator } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                onFilter && onFilter(values)
            })
        }
        function handleReset(e) {
            e.preventDefault();
            form.resetFields();
            onFilter && onFilter({ sickId: null, sickName: null, mobilePhone: null })
        }

        return <Form layout="inline" >
            <Form.Item label="病例号">
                {getFieldDecorator("sickId")(<Input placeholder="请输入病历号" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="姓名">
                {getFieldDecorator("sickName")(<Input placeholder="请输入姓名" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="联系方式">
                {getFieldDecorator("mobilePhone")(<Input placeholder="请输入联系方式" autoComplete="off" />)}
            </Form.Item>
            <Form.Item>
                <Button.Group>
                    <Button onClick={handleReset}>重置</Button>
                    <Button type="primary" onClick={handleSubmit}>查询</Button>
                </Button.Group>
            </Form.Item>
        </Form>
    }
)