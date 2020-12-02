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

export default function vr() {
    const intl = useIntl();
    const [form] = Form.useForm();
    const [version, setVersion] = useState("1.1");

    useEffect(() => {
        notification.destroy();
        notification.info({
            duration: null,
            message: `${intl.formatMessage({ id: "text.changeLog" })}:`,
            top: 96,
            style: {
                width: 300,
            },
            description: (
                <div className="change-log">
                    <h4 className="change-log__title">
                        {intl.formatMessage({ id: "calc.vr.changeLog.1_1.title" })}
                    </h4>
                    <p className="change-log__time">
                        <span>2020-09-26</span>
                    </p>
                    <ul
                        className="change-log__list"
                        dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({ id: "calc.vr.changeLog.1_1" }),
                        }}
                    ></ul>
                </div>
            ),
        });
    }, []);

    async function onSubmit() {
        try {
            const formData = await form.validateFields();
            const { data } = await calcApi("formulavr")({ ...formData, version });
            console.log(data);
        } catch (e) {}
    }

    function onReset() {
        form.resetFields();
    }

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.vr.name" />
            <Select
                value={version}
                onChange={(version) => setVersion(version)}
                style={{ width: 70, marginLeft: 12 }}
            >
                <Option value="1.0">v 1.0</Option>
                <Option value="1.1">v 1.1</Option>
            </Select>
        </h1>,
        <Collapse
            key="collapse"
            ghost
            defaultActiveKey={["instructions", "notes", "rawdata", "pay", "content"]}
        >
            <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                <FormattedMessage id="calc.vr.instructions" />
            </Panel>
            <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                <FormattedMessage id="calc.vr.notes" />
            </Panel>
            {/* <Panel key="rawdata" header={<FormattedMessage id="tip.title.rawdata" />}>
                <FormattedMessage id="calc.vr.rawdata" />
            </Panel>
            <Panel key="pay" header={<FormattedMessage id="tip.title.pay" />}>
                <FormattedMessage id="calc.vr.pay" />
            </Panel> */}
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
                            <Form.Item
                                label="Optic Zone"
                                name="opicZone"
                                rules={[{ required: true }]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col {...layout}>
                            <Form.Item label="C7" name="c7" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C8" name="c8" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C11" name="c11" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C12" name="c12" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C13" name="c13" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
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
