import { Form, Input, Button, DatePicker } from "antd";
import React from "react";

export const TodayFilter = Form.create()(
    ({ form, onFilter }) => {
        const { getFieldDecorator } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                onFilter && onFilter(values);
            });
        };

        function handleReset(e) {
            e.preventDefault();
            form.resetFields();
            form.validateFields((err, values) => {
                if (err) return;
                onFilter && onFilter(values);
            });
        };

        return <Form layout="inline">
            <Form.Item label="姓名">
                {getFieldDecorator('name')(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="电话号码">
                {getFieldDecorator('phone')(<Input autoComplete="off" />)}
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

export const SearchFilter = Form.create()(
    ({ form, onFilter }) => {
        const { getFieldDecorator } = form;

        function handleSubmit(e) {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                onFilter && onFilter(values);
            });
        };

        function handleReset(e) {
            e.preventDefault();
            form.resetFields();
            form.validateFields((err, values) => {
                if (err) return;
                onFilter && onFilter(values);
            });
        };

        return <Form layout="inline">
            <div>
                <Form.Item label="姓名">
                    {getFieldDecorator('name')(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="电话号码">
                    {getFieldDecorator('phone')(<Input autoComplete="off" />)}
                </Form.Item>
                <Form.Item>
                    <Button.Group>
                        <Button onClick={handleReset}>重置</Button>
                        <Button type="primary" onClick={handleSubmit}>查询</Button>
                    </Button.Group>
                </Form.Item>
            </div>
            <div>
                <Form.Item label="预约时间">
                    {getFieldDecorator('appointDate')(<DatePicker />)}
                </Form.Item>
                <Form.Item label="预约时间">
                    {getFieldDecorator('appointDate')(<DatePicker />)}
                </Form.Item>
            </div>
        </Form>
    }
)