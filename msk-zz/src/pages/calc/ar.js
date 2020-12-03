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

export default function ar() {
    const intl = useIntl();
    const [form] = Form.useForm();

    async function onSubmit() {
        try {
            const formData = await form.validateFields();
            const { data } = await calcApi("zzar")(formData);
            console.log(data);
        } catch (e) {}
    }

    function onReset() {
        form.resetFields();
    }

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.ar.name" />
        </h1>,
        <Collapse
            key="collapse"
            ghost
            defaultActiveKey={["instructions", "notes", "rawdata", "pay", "content"]}
        >
            <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                <FormattedMessage id="calc.ar.instructions" />
            </Panel>
            <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                <FormattedMessage id="calc.ar.notes" />
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
                    </Row>
                    <Row gutter={24}>
                        <Col {...layout}>
                            <Form.Item label="Kf" name="kf" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Ks" name="ks" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kf Axis" name="kfAxis" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col {...layout}>
                            <Form.Item label="TMR C" name="tmrc" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kf2" name="kf2" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="TMR A" name="tmra" rules={[{ required: true }]}>
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
