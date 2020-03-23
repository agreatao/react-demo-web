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
                <Form.Item label="K (A)" name="k1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Correct D" name="correctD" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="e (A)" name="e1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Post Q (A)" name="postQ1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="K (P)" name="k2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="D (P)" name="d2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="e (P)" name="e2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Post Q (P)" name="postQ2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="s" name="s">
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="Optical Zone">{result.input.opicZone}</Descriptions.Item>
                    <Descriptions.Item label="K (A)">{result.input.k1}</Descriptions.Item>
                    <Descriptions.Item label="Correct D">{result.input.correctD}</Descriptions.Item>
                    <Descriptions.Item label="e (A)">{result.input.e1}</Descriptions.Item>
                    <Descriptions.Item label="Post Q (A)">{result.input.postQ1}</Descriptions.Item>
                    <Descriptions.Item label="K (P)">{result.input.k2}</Descriptions.Item>
                    <Descriptions.Item label="D (P)">{result.input.d2}</Descriptions.Item>
                    <Descriptions.Item label="e (P)">{result.input.e2}</Descriptions.Item>
                    <Descriptions.Item label="Post Q (P)">{result.input.postQ2}</Descriptions.Item>
                    <Descriptions.Item label="s">{result.input.s}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="Q 1">{result.output.q1}</Descriptions.Item>
                    <Descriptions.Item label="Lsa 1">{result.output.lsa1}</Descriptions.Item>
                    <Descriptions.Item label="Post Lsa A">{result.output.postLsaA}</Descriptions.Item>
                    <Descriptions.Item label="Q 2">{result.output.q2}</Descriptions.Item>
                    <Descriptions.Item label="Lsa 2">{result.output.lsa2}</Descriptions.Item>
                    <Descriptions.Item label="s">{result.output.s}</Descriptions.Item>
                    <Descriptions.Item label="Q 3">{result.output.q3}</Descriptions.Item>
                    <Descriptions.Item label="Lsa 3">{result.output.lsa3}</Descriptions.Item>
                    <Descriptions.Item label="Post Lsa W">{result.output.postLsaW}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}