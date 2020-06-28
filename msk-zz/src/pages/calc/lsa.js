import { Descriptions, Input } from 'antd';
import { calcLSA } from 'api/calc';
import Form from 'components/Form';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export default function LSA() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        calcLSA.send(values)
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
                <Form.Item label="Optic Zone" name="opicZone" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Vertex K" name="vertexK" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="e" name="e" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Correct SE" name="correctSe" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Δ LSA" name="lsa" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'LABEL_INPUT' })}>
                    <Descriptions.Item label="Optic Zone">{result.input.opicZone}</Descriptions.Item>
                    <Descriptions.Item label="Vertex K">{result.input.vertexK}</Descriptions.Item>
                    <Descriptions.Item label="e">{result.input.e}</Descriptions.Item>
                    <Descriptions.Item label="Correct SE">{result.input.correctSe}</Descriptions.Item>
                    <Descriptions.Item label="Δ LSA">{result.input.lsa}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={2} colon={false} title={intl.formatMessage({ id: 'LABEL_OUTPUT' })}>
                    <Descriptions.Item label="> 5m" span={2} />
                    <Descriptions.Item label="Δ Q">{result.output.farQ}</Descriptions.Item>
                    <Descriptions.Item label="Expect Q">{result.output.farExpectQ}</Descriptions.Item>
                    <Descriptions.Item label="33cm" span={2} />
                    <Descriptions.Item label="Δ Q">{result.output.nearQ}</Descriptions.Item>
                    <Descriptions.Item label="Expect Q">{result.output.nearExpectQ}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}