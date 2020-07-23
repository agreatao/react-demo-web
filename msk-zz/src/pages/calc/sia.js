import { Descriptions, Input } from 'antd';
import { calcSIA } from 'api/calc';
import Form from 'components/Form';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export default function SIA() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        calcSIA.send(values)
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
        <Tip method="sia"  />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="Mani Sph" name="maniSph" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Cyl" name="maniCyl" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Cyl Axis" name="maniCylAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA D" name="siaD" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA Axis" name="siaAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'LABEL_INPUT' })}>
                    <Descriptions.Item label="Mani Sph">{result.input.maniSph}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl">{result.input.maniCyl}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl Axis">{result.input.maniCylAxis}</Descriptions.Item>
                    <Descriptions.Item label="SIA D">{result.input.siaD}</Descriptions.Item>
                    <Descriptions.Item label="SIA Axis">{result.input.siaAxis}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'LABEL_OUTPUT' })}>
                    <Descriptions.Item label="Sph">{result.output.sph}</Descriptions.Item>
                    <Descriptions.Item label="Cyl">{result.output.cyl}</Descriptions.Item>
                    <Descriptions.Item label="Axis">{result.output.axis}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}