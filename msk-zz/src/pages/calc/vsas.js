import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Input, message, Radio, Row, Spin } from "antd";
import calcApi from "api/calc";
import CalcResult from "CalcResult";
import Polar from "Chart/Polar";
import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

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
    sm: 8,
};

export default function vsas() {
    const intl = useIntl();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [activeKey, setActiveKey] = useState([
        "instructions",
        "notes",
        "rawdata",
        "pay",
        "input",
    ]);
    const [chartType, setChartType] = useState("single");

    const onSubmit = useCallback(async () => {
        try {
            const formData = await form.validateFields().catch((e) => {});
            setLoading(true);
            const { data } = await calcApi("zzastigmatism")(formData);
            setLoading(false);
            setData(data);
            activeKey.remove("input");
            activeKey.push("output");
            setActiveKey([...activeKey]);
        } catch (e) {
            setLoading(false);
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }, []);

    const onReset = useCallback(() => {
        form.resetFields();
        onClose();
    }, []);

    const onClose = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        activeKey.remove("output");
        activeKey.push("input");
        setActiveKey([...activeKey]);
        setData(null);
    }, []);

    const onActiveChange = useCallback((activeKey) => {
        setActiveKey(activeKey);
    }, []);

    const onChartTypeChange = useCallback((e) => {
        setChartType(e.target.value);
    }, []);

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.vsas.name" />
        </h1>,
        <Spin key="collapse" spinning={loading}>
            <Collapse ghost activeKey={activeKey} onChange={onActiveChange}>
                <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                    <FormattedMessage id="calc.vsas.instructions" />
                </Panel>
                <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                    <FormattedMessage id="calc.vsas.notes" />
                </Panel>
                <Panel key="input" header={<FormattedMessage id="text.input" />}>
                    <Form
                        form={form}
                        {...formLayout}
                        validateMessages={{
                            required: intl.formatMessage({ id: "form.rules.required.field" }),
                        }}
                    >
                        <Row gutter={24}>
                            <Col {...layout}>
                                <Form.Item label="Sph A" name="sph1" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="Cyl A" name="cyl1" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="Axis A" name="axis1" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="Sph B" name="sph2" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="Cyl B" name="cyl2" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="Axis B" name="axis2" rules={[{ required: true }]}>
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
                {data && (
                    <Panel
                        key="output"
                        header={<FormattedMessage id="text.output" />}
                        extra={<CloseOutlined onClick={onClose} />}
                    >
                        <CalcResult
                            data={data}
                            dataKeys={{
                                sph1add2: "Sph A + B",
                                cyl1add2: "Cyl A + B",
                                axis1add2: "Axis A + B",
                                sph1cut2: "Sph A - B",
                                cyl1cut2: "Cyl A - B",
                                axis1cut2: "Axis A - B",
                            }}
                        />
                        <Radio.Group
                            options={[
                                {
                                    label: intl.formatMessage({ id: "btn.single" }),
                                    value: "single",
                                },
                                {
                                    label: intl.formatMessage({ id: "btn.double" }),
                                    value: "double",
                                },
                            ]}
                            optionType="button"
                            value={chartType}
                            onChange={onChartTypeChange}
                        />
                        <Polar
                            type={chartType}
                            data={
                                data && [
                                    [
                                        +form.getFieldValue("cyl1"),
                                        +form.getFieldValue("axis1"),
                                        "A",
                                    ],
                                    [
                                        +form.getFieldValue("cyl2"),
                                        +form.getFieldValue("axis2"),
                                        "B",
                                    ],
                                    [+data.cyl1add2, +data.axis1add2, "A + B"],
                                    [+data.cyl1cut2, +data.axis1cut2, "A - B"],
                                ]
                            }
                            height={400}
                        />
                    </Panel>
                )}
            </Collapse>
        </Spin>,
    ];
}
