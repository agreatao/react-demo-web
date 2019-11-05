import { Button, Form, Input } from "antd";
import React from "react";

const CheckTypeFilter = Form.create()(
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
            onFilter && onFilter({ checkTypeName: undefined })
        }

        return <Form layout="inline">
            <Form.Item label="项目名称">
                {getFieldDecorator("checkTypeName")(<Input placeholder="请输入项目名称" autoComplete="off" />)}
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

export default CheckTypeFilter;