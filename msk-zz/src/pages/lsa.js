import React, { useState } from 'react';
import Tip from 'components/Tip';
import { Input, Descriptions } from 'antd';
import Form from 'components/Form';
import Result from 'components/Result';
import { lsa } from 'api';
import { useIntl } from 'react-intl';

export default function LSA() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        lsa(values)
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
        <Tip method="LSA" />
        <div className="calculate-wrapper">
            <Form onFinish={calculate} initialValues={{ s: 10000000 }}>
                <Form.Item label="Opic Zone" name="opicZone" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Vertex K" name="vertexK" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="e" name="e" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Correct Se" name="correctSe" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Expect Q" name="expectQ" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="Optical Zone">{result.input.opicZone}</Descriptions.Item>
                    <Descriptions.Item label="Vertex K">{result.input.vertexK}</Descriptions.Item>
                    <Descriptions.Item label="e">{result.input.e}</Descriptions.Item>
                    <Descriptions.Item label="Correct Se">{result.input.correctSe}</Descriptions.Item>
                    <Descriptions.Item label="Expect Q">{result.input.expectQ}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="far Q">{result.output.farQ}</Descriptions.Item>
                    <Descriptions.Item label="near Q">{result.output.nearQ}</Descriptions.Item>
                    <Descriptions.Item label="far Lsa">{result.output.farLsa}</Descriptions.Item>
                    <Descriptions.Item label="near Lsa">{result.output.nearLsa}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}