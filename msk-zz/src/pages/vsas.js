import { Descriptions, Input } from 'antd';
import { vsas } from 'api';
import Form from 'components/Form';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export default function VSAS() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        vsas(values)
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

    return <React.Fragment>
        <Tip method="VSAS" tips={["INSTRUCTIONS"]} />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="Sph 1" name="sph1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Cyl 1" name="cyl1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Axis 1" name="axis1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Sph 2" name="sph2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Cyl 2" name="cyl2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Axis 2" name="axis2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="Sph 1">{result.input.sph1}</Descriptions.Item>
                    <Descriptions.Item label="Cyl 1">{result.input.cyl1}</Descriptions.Item>
                    <Descriptions.Item label="Axis 1">{result.input.axis1}</Descriptions.Item>
                    <Descriptions.Item label="Sph 2">{result.input.sph2}</Descriptions.Item>
                    <Descriptions.Item label="Cyl 2">{result.input.cyl2}</Descriptions.Item>
                    <Descriptions.Item label="Axis 2">{result.input.axis2}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="Sph 1 + 2">{result.output.sph1add2}</Descriptions.Item>
                    <Descriptions.Item label="Sph 1 - 2">{result.output.sph1cut2}</Descriptions.Item>
                    <Descriptions.Item label="Cyl 1 + 2">{result.output.cyl1add2}</Descriptions.Item>
                    <Descriptions.Item label="Cyl 1 - 2">{result.output.cyl1cut2}</Descriptions.Item>
                    <Descriptions.Item label="Axis 1 + 2">{result.output.axis1add2}</Descriptions.Item>
                    <Descriptions.Item label="Axis 1 - 2">{result.output.axis1cut2}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}