import { Button, Col, Collapse, Form, Input, Row } from "antd";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import calcApi from "api/calc";

const { Panel } = Collapse;

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

export default function tiol() {
    const intl = useIntl();
    const [form] = Form.useForm();

    async function onSubmit() {
        try {
            const formData = await form.validateFields();
            const { data } = await calcApi("zztoriciol")(formData);
            console.log(data);
        } catch (e) {}
    }

    function onReset() {
        form.resetFields();
    }

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.lsa.name" />
        </h1>,
        <Collapse key="collapse" ghost defaultActiveKey={["notes", "rawdata", "pay", "content"]}>
            <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                <FormattedMessage id="calc.tiol.notes" />
            </Panel>
            <Panel key="rawdata" header={<FormattedMessage id="tip.title.rawdata" />}>
                <FormattedMessage id="calc.tiol.rawdata" />
            </Panel>
            <Panel key="pay" header={<FormattedMessage id="tip.title.pay" />}>
                <FormattedMessage id="calc.tiol.pay" />
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
                            <Form.Item label="A Constant" name="aCons" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Target D" name="targetD" rules={[{ required: true }]}>
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
                            <Form.Item label="Kf1" name="kf1" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kb1" name="kb1" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kf1 Axis" name="axis" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kf2" name="kf2" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kb2" name="kb2" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="AL (mm)" name="al" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="LT (mm)" name="lt">
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="SIA" name="sia" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="SIA Axis" name="siaAxis" rules={[{ required: true }]}>
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
