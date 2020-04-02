import React, { useState } from 'react';
import Tip from 'components/Tip';
import { Input, Descriptions } from 'antd';
import Form from 'components/Form';
import Result from 'components/Result';
import { tiol } from 'api';
import { useIntl } from 'react-intl';

export default function TIOL() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        tiol(values)
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
        <Tip method="TIOL" tips={['NOTES', 'RAWDATA']} />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="A Constant" name="aCons" rules={[{ required: true }]}>
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
                <Form.Item label="Kf1" name="kf1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Kb1" name="kb1" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Kf1 Axis" name="axis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Kf2" name="kf2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Kb2" name="kb2" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="AL (mm)" name="al" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="LT (mm)" name="lt">
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA" name="sia" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA Axis" name="siaAxis" rules={[{ required: true }]}>
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
                    <Descriptions.Item label="Kf1">{result.input.kf1}</Descriptions.Item>
                    <Descriptions.Item label="Kf2">{result.input.kf2}</Descriptions.Item>
                    <Descriptions.Item label="Kf1 Axis">{result.input.axis}</Descriptions.Item>
                    <Descriptions.Item label="Kb1">{result.input.kb1}</Descriptions.Item>
                    <Descriptions.Item label="Kb2">{result.input.kb2}</Descriptions.Item>
                    <Descriptions.Item label="AL (mm)">{result.input.al}</Descriptions.Item>
                    <Descriptions.Item label="LT (mm)">{result.input.lt}</Descriptions.Item>
                    <Descriptions.Item label="SIA">{result.input.sia}</Descriptions.Item>
                    <Descriptions.Item label="SIA Axis">{result.input.siaAxis}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="SE">{result.output.se}</Descriptions.Item>
                    <Descriptions.Item label="Sperical">{result.output.sperical}</Descriptions.Item>
                    <Descriptions.Item label="Cylinder">{result.output.cylinder}</Descriptions.Item>
                    <Descriptions.Item label="Axis">{result.output.cylinderAxis}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}