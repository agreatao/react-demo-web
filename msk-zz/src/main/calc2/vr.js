import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Input, message, Radio, Row, Select, Spin } from "antd";
import calcApi from "api/calc";
import CalcResult from "CalcResult";
import Polar from "Chart/Polar";
import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { VersionLogButton } from "VersionLog";

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
            const formData = await form.validateFields();
            setLoading(true);
            const { data } = await calcApi("formulavr")({ ...formData, version });
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
            <FormattedMessage id="calc.vr.name" />
            <Select
                value={version}
                onChange={(version) => setVersion(version)}
                style={{ width: 76, marginLeft: 12 }}
            >
                <Option value="1.0">v 1.0</Option>
                <Option value="1.1">v 1.1</Option>
            </Select>
            <VersionLogButton>
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
            </VersionLogButton>
        </h1>,
        <Spin key="collapse" spinning={loading}>
            <Collapse ghost activeKey={activeKey} onChange={onActiveChange}>
                <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                    <FormattedMessage id="calc.vr.instructions" />
                </Panel>
                <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                    <FormattedMessage id="calc.vr.notes" />
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
                                <Form.Item
                                    label="Mani Sph"
                                    name="maniSph"
                                    rules={[{ required: true }]}
                                >
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item
                                    label="Mani Cyl"
                                    name="maniCyl"
                                    rules={[{ required: true }]}
                                >
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
                {data && (
                    <Panel
                        key="output"
                        header={<FormattedMessage id="text.output" />}
                        extra={<CloseOutlined onClick={onClose} />}
                    >
                        <CalcResult
                            data={data}
                            dataKeys={{
                                vrSph: "VR Sph",
                                vrCyl: "VR Cyl",
                                vrAxis: "VR Axis",
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
                                    [+data.maniCyl, +data.maniAxis, "Mani"],
                                    [+data.comaCyl, +data.comaAxis, "COMA"],
                                    [+data.c11Cyl, 135, "C11"],
                                    [+data.c13Cyl, 90, "C13"],
                                    [+data.vrCyl, +data.vrAxis, "VR"],
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
