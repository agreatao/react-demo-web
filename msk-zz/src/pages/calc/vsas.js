import { Form, Descriptions, Input, Button, Radio, Row, Col } from 'antd';
import { calcVSAS } from 'api/calc';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Polar from 'components/Chart/Polar';
import { useSelector } from 'react-redux';

export default function VSAS() {
    const [form] = Form.useForm();
    const width = useSelector(state => state.browser.width);
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });
    const [chartType, setChartType] = useState('single');

    const layout = {
        xs: 24,
        sm: 8
    }

    const formLayout = {
        labelCol: {
            sm: 10
        },
        wrapperCol: {
            sm: 14
        }
    }

    function calculate(values) {
        calcVSAS.send(values)
            .then(data => {
                setResult({ visible: true, output: data, input: values });
            })
            .catch(e => {
                console.error(e);
            });
    }

    function close() {
        setResult({ visible: false, output: null, input: null, error: null });
    }

    function handleReset() {
        form.resetFields();
    }

    return <React.Fragment>
        <Tip method="vsas" />
        <div className="calculate-wrapper">
            <Form form={form} {...formLayout} onFinish={calculate} className="calculate-form">
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
                <Form.Item wrapperCol={{
                    sm: { span: 20, offset: 4 }
                }}>
                    <Button className="calculate-btn" type="primary" htmlType="submit">{intl.formatMessage({ id: "btn.calc" })}</Button>
                    <Button className="calculate-btn" onClick={handleReset}>{intl.formatMessage({ id: "btn.clear" })}</Button>
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions size="small" bordered colon={false} column={3} title={intl.formatMessage({ id: 'text.input' })} layout="vertical">
                    <Descriptions.Item label="Sph A">{result.input.sph1}</Descriptions.Item>
                    <Descriptions.Item label="Cyl A">{result.input.cyl1}</Descriptions.Item>
                    <Descriptions.Item label="Axis A">{result.input.axis1}</Descriptions.Item>
                    <Descriptions.Item label="Sph B">{result.input.sph2}</Descriptions.Item>
                    <Descriptions.Item label="Cyl B">{result.input.cyl2}</Descriptions.Item>
                    <Descriptions.Item label="Axis B">{result.input.axis2}</Descriptions.Item>
                </Descriptions>}
            {result.output &&
                <Descriptions size="small" bordered colon={false} column={3} title={intl.formatMessage({ id: 'text.output' })} layout="vertical">
                    <Descriptions.Item label="Sph A + B">{result.output.sph1add2}</Descriptions.Item>
                    <Descriptions.Item label="Cyl A + B">{result.output.cyl1add2}</Descriptions.Item>
                    <Descriptions.Item label="Axis A + B">{result.output.axis1add2}</Descriptions.Item>
                    <Descriptions.Item label="Sph A - B">{result.output.sph1cut2}</Descriptions.Item>
                    <Descriptions.Item label="Cyl A - B">{result.output.cyl1cut2}</Descriptions.Item>
                    <Descriptions.Item label="Axis A - B">{result.output.axis1cut2}</Descriptions.Item>
                </Descriptions>}
            <div>
                <Radio.Group
                    options={[{ label: intl.formatMessage({ id: 'btn.single' }), value: 'single' }, { label: intl.formatMessage({ id: 'btn.double' }), value: 'double' }]}
                    onChange={e => setChartType(e.target.value)}
                    value={chartType}
                    optionType="button"
                />
            </div>
            <div>
                <Polar
                    type={chartType}
                    data={result.input && result.output ? [
                        [+result.input.cyl1, +result.input.axis1, 'A'],
                        [+result.input.cyl2, +result.input.axis2, 'B'],
                        [result.output.cyl1add2, result.output.axis1add2, 'A+B'],
                        [result.output.cyl1cut2, result.output.axis1cut2, 'A-B'],
                    ] : []}
                    width={width < 576 ? 320 : 400}
                    height={width < 576 ? 320 : 400}
                />
            </div>
        </Result>
    </React.Fragment>
}