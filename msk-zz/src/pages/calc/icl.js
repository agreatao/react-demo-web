import { Button, Col, Collapse, Form, Input, notification, Row, Select } from "antd";
import calcApi from "api/calc";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const { Panel } = Collapse;
const { Option } = Select;

const formLayout = {
    labelCol: {
        sm: { span: 10 },
    },
    wrapperCol: {
        sm: { span: 14 },
    },
};

const layout = {
    span: 12,
    xs: 24,
    sm: 12,
};

export default function icl() {
    const intl = useIntl();
    const [form] = Form.useForm();

    async function onSubmit() {
        try {
            const formData = await form.validateFields();
            const { data } = await calcApi("zzicl")(formData);
            console.log(data);
        } catch (e) {}
    }

    function onReset() {
        form.resetFields();
    }

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.icl.name" />
        </h1>,
        <Collapse
            key="collapse"
            ghost
            defaultActiveKey={["instructions", "notes", "rawdata", "pay", "content"]}
        >
            <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                <FormattedMessage id="calc.icl.instructions" />
            </Panel>
            <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                <FormattedMessage id="calc.icl.notes" />
            </Panel>
            <Panel key="content" header={<FormattedMessage id="text.input" />}>
                <Form
                    form={form}
                    {...formLayout}
                    validateMessages={{
                        required: intl.formatMessage({ id: "form.rules.required.field" }),
                    }}
                >
                    <Row gutter={24}>
                        <Col {...layout}>
                            <Form.Item label="Mani Sph" name="maniSph" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Mani Cyl" name="maniCyl" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item
                                label="Mani Cyl Axis"
                                name="maniCylAxis"
                                rules={[{ required: true }]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="SIA D" name="siaD" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="SIA A" name="siaA" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="CT (μm)" name="ct" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="AC (mm)" name="ac" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kf" name="kf" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="LT (mm)" name="lt" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item
                                label="Icl Diameter"
                                name="iclDiameter"
                                rules={[{ required: true }]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item
                                label="H(0) to V(90)"
                                name="htov"
                                rules={[{ required: true }]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="STS-H (mm)" name="stsH" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="STS-V (mm)" name="stsV" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item group="extra" label="ICL S" name="iclS">
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item group="extra" label="ICL C" name="iclC">
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item group="extra" label="ICL A" name="iclA">
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="calc-btn__wrapper">
                    <Button className="calc-btn" type="primary" onClick={onSubmit}>
                        <FormattedMessage id="btn.calc" />
                    </Button>
                    <Button className="calc-btn" onClick={onReset}>
                        <FormattedMessage id="btn.clear" />
                    </Button>
                </div>
            </Panel>
        </Collapse>,
    ];
}
