import React, { useState } from 'react';
import Tip from 'components/Tip';
import { Input, Descriptions } from 'antd';
import Form from 'components/Form';
import Result from 'components/Result';
import { vrpro } from 'api';
import { useIntl } from 'react-intl';

export default function VRPRO() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        vrpro(values)
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
        <Tip method="VRPRO" />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="Optical Zone" name="opicZone" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="C7" name="c7" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="C8" name="c8" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="C11" name="c11" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="C12" name="c12" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="C13" name="c13" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Sph" name="maniSph" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Cyl" name="maniCyl" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Cyl Axis" name="maniCylAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="Optical Zone">{result.input.opicZone}</Descriptions.Item>
                    <Descriptions.Item label="C7">{result.input.c7}</Descriptions.Item>
                    <Descriptions.Item label="C8">{result.input.c8}</Descriptions.Item>
                    <Descriptions.Item label="C11">{result.input.c11}</Descriptions.Item>
                    <Descriptions.Item label="C12">{result.input.c12}</Descriptions.Item>
                    <Descriptions.Item label="C13">{result.input.c13}</Descriptions.Item>
                    <Descriptions.Item label="Mani Sph">{result.input.maniSph}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl">{result.input.maniCyl}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl Axis">{result.input.maniCylAxis}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="Correct Sph">{result.output.correctSph}</Descriptions.Item>
                    <Descriptions.Item label="Correct Cyl">{result.output.correctCyl}</Descriptions.Item>
                    <Descriptions.Item label="Correct Cyl Axis">{result.output.correctCylAxis}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}