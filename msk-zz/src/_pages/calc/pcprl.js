import { Button, Col, Descriptions, Form, Input, Row } from "antd";
import { calcPcprl } from "api/calc";
import Result from "components/Result";
import Tip from "components/Tip";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function PCPRL() {
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
        calcPcprl
            .send({ ...values })
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
            <Tip method="pcprl" />
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
                            <Form.Item label="CT (μm)" name="ct" rules={[{ required: true }]}>
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
                        <Descriptions.Item label="AC (mm)">{result.input.ac}</Descriptions.Item>
                        <Descriptions.Item label="Kf">{result.input.kf}</Descriptions.Item>
                        <Descriptions.Item label="CT (μm)">{result.input.ct}</Descriptions.Item>
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
                        <Descriptions.Item label="PC-PRL">{result.output.pcPrl}</Descriptions.Item>
                    </Descriptions>
                )}
            </Result>
        </React.Fragment>
    );
}
