import React, { useState } from 'react';
import Tip from 'components/Tip';
import { Input, Descriptions } from 'antd';
import Form from 'components/Form';
import Result from 'components/Result';
import { iol } from 'api';
import { useIntl } from 'react-intl';

export default function IOL() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        iol(values)
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
        <Tip method="IOL" tips={['NOTES', 'RAWDATA']} />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="A Constant" name="aConstant" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Target D" name="targetD" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="CT (μm)" name="ct" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="AC (mm)" name="ac" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Kf" name="kf" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Kb" name="kb" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="AL (mm)" name="al" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="LT (mm)" name="lt">
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="A Constant">{result.input.aConstant}</Descriptions.Item>
                    <Descriptions.Item label="Target D">{result.input.targetD}</Descriptions.Item>
                    <Descriptions.Item label="CT (μm)">{result.input.ct}</Descriptions.Item>
                    <Descriptions.Item label="AC (mm)">{result.input.ac}</Descriptions.Item>
                    <Descriptions.Item label="Kf">{result.input.kf}</Descriptions.Item>
                    <Descriptions.Item label="Kb">{result.input.kb}</Descriptions.Item>
                    <Descriptions.Item label="AL (mm)">{result.input.al}</Descriptions.Item>
                    <Descriptions.Item label="LT (mm)">{result.input.lt}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="D">{result.output.d}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}