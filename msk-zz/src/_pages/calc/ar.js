import { Button, Col, Descriptions, Form, Input, Radio, Row } from "antd";
import { calcAR } from "api/calc";
import Polar from "components/Chart/Polar";
import Result from "components/Result";
import Tip from "components/Tip";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function AR() {
    const [form] = Form.useForm();
    const width = useSelector((state) => state.browser.width);
    const intl = useIntl();
    const [result, setResult] = useState({
        visible: false,
        output: null,
        input: null,
        error: null,
    });
    const [chartType, setChartType] = useState("single");

    const layout = {
        xs: 24,
        sm: 12,
    };

    const formLayout = {
        labelCol: {
            sm: 10,
        },
        wrapperCol: {
            sm: 14,
        },
    };

    function calculate(values) {
        calcAR
            .send(values)
            .then((data) => {
                setResult({ visible: true, output: data, input: values });
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function close() {
        setResult({ visible: false, output: null, input: null, error: null });
    }

    function handleReset() {
        form.resetFields();
    }

    return (
        <React.Fragment>
            <Tip method="ar" />
            <div className="calculate-wrapper">
                <Form form={form} {...formLayout} onFinish={calculate} className="calculate-form">
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
                            <Form.Item label="TMR A" name="tmra" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        wrapperCol={{
                            sm: { span: 19, offset: 5 },
                        }}
                    >
                        <Button className="calculate-btn" type="primary" htmlType="submit">
                            {intl.formatMessage({ id: "btn.calc" })}
                        </Button>
                        <Button className="calculate-btn" onClick={handleReset}>
                            {intl.formatMessage({ id: "btn.clear" })}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Result visible={result.visible} onClose={close}>
                {result.input && (
                    <Descriptions
                        size="small"
                        bordered
                        colon={false}
                        column={3}
                        title={intl.formatMessage({ id: "text.input" })}
                        layout="vertical"
                    >
                        <Descriptions.Item label="Mani Sph">
                            {result.input.maniSph}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mani Cyl">
                            {result.input.maniCyl}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mani Cyl Axis">
                            {result.input.maniCylAxis}
                        </Descriptions.Item>
                        <Descriptions.Item label="Kf">{result.input.kf}</Descriptions.Item>
                        <Descriptions.Item label="Ks">{result.input.ks}</Descriptions.Item>
                        <Descriptions.Item label="Kf Axis">{result.input.kfAxis}</Descriptions.Item>
                        <Descriptions.Item label="TMR C">{result.input.tmrc}</Descriptions.Item>
                        <Descriptions.Item label="TMR A">{result.input.tmra}</Descriptions.Item>
                    </Descriptions>
                )}
                {result.output && (
                    <Descriptions
                        size="small"
                        bordered
                        colon={false}
                        column={3}
                        title={intl.formatMessage({ id: "text.output" })}
                        layout="vertical"
                    >
                        <Descriptions.Item label="AR Sph">{result.output.arSph}</Descriptions.Item>
                        <Descriptions.Item label="AR Cyl">{result.output.arCyl}</Descriptions.Item>
                        <Descriptions.Item label="AR Axis">
                            {result.output.arAxis}
                        </Descriptions.Item>
                    </Descriptions>
                )}
                <div>
                    <Radio.Group
                        options={[
                            { label: intl.formatMessage({ id: "btn.single" }), value: "single" },
                            { label: intl.formatMessage({ id: "btn.double" }), value: "double" },
                        ]}
                        onChange={(e) => setChartType(e.target.value)}
                        value={chartType}
                        optionType="button"
                    />
                </div>
                <div>
                    <Polar
                        type={chartType}
                        data={
                            result.input && result.output
                                ? [
                                      [+result.output.maniCyl, +result.output.maniAxis, "Mani"],
                                      [+result.output.tmrCyl, +result.output.tmrAxis, "TMR"],
                                      [
                                          +result.output.postLensCyl,
                                          +result.output.postLensAxis,
                                          "Post+Lens",
                                      ],
                                      [+result.output.hosaCyl, +result.output.hosaAxis, "HOAs"],
                                      [result.output.arCyl, result.output.arAxis, "AR"],
                                  ]
                                : []
                        }
                        width={width < 576 ? 320 : 400}
                        height={width < 576 ? 320 : 400}
                    />
                </div>
            </Result>
        </React.Fragment>
    );
}
