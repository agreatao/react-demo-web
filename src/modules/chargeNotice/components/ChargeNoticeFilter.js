import { Button, Form, Input } from "antd";
import React from "react";

const ChargeNoticeFilter = Form.create()(
    ({ form, onFilter }) => {
        const { getFieldDecorator } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                onFilter && onFilter(values)
            });
        }

        function handleReset(e) {
            e.preventDefault();
            form.resetFields();
            onFilter && onFilter({ sickName: undefined });
        }

        return <Form layout="inline">
            <Form.Item label="患者姓名">
                {getFieldDecorator("sickName")(<Input placeholder="请输入患者姓名" autoComplete="off" />)}
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

export default ChargeNoticeFilter;