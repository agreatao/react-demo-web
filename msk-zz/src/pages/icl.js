import React, { useState } from 'react';
import Tip from 'components/Tip';
import { Input, Descriptions } from 'antd';
import Form from 'components/Form';
import Result from 'components/Result';
import { icl } from 'api';
import { useIntl } from 'react-intl';

export default function ICL() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        icl(values)
            .then(data => {
                console.log(data);
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
        <Tip method="ICL" />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="Mani Sph" name="maniSph" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Cyl" name="maniCyl" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Axis" name="maniCylAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA D" name="siaD" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA A" name="siaA" rules={[{ required: true }]}>
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
                <Form.Item label="LT (mm)" name="lt" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Icl Diameter" name="iclDiameter" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="H(0) to V(90)" name="htov" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="STS-H (mm)" name="stsH" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="STS-V (mm)" name="stsV" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item group="extra" label="ICL S" name="iclS">
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item group="extra" label="ICL C" name="iclC">
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item group="extra" label="ICL A" name="iclA">
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="Mani Sph">{result.input.maniSph}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl">{result.input.maniCyl}</Descriptions.Item>
                    <Descriptions.Item label="Mani Axis">{result.input.maniCylAxis}</Descriptions.Item>
                    <Descriptions.Item label="SIA D">{result.input.siaD}</Descriptions.Item>
                    <Descriptions.Item label="SIA A">{result.input.siaA}</Descriptions.Item>
                    <Descriptions.Item label="CT (μm)">{result.input.ct}</Descriptions.Item>
                    <Descriptions.Item label="AC (mm)">{result.input.ac}</Descriptions.Item>
                    <Descriptions.Item label="Kf">{result.input.kf}</Descriptions.Item>
                    <Descriptions.Item label="LT (mm)">{result.input.lt}</Descriptions.Item>
                    <Descriptions.Item label="Icl Diameter">{result.input.iclDiameter}</Descriptions.Item>
                    <Descriptions.Item label="H(0) to V(90)">{result.input.htov}</Descriptions.Item>
                    <Descriptions.Item label="STS-H (mm)">{result.input.stsH}</Descriptions.Item>
                    <Descriptions.Item label="STS-V (mm)">{result.input.stsV}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="ICL S">{result.output.iclS}</Descriptions.Item>
                    <Descriptions.Item label="ICL C">{result.output.iclC}</Descriptions.Item>
                    <Descriptions.Item label="ICL A">{result.output.iclA}</Descriptions.Item>
                    <Descriptions.Item label="Esti Vault">{result.output.estiVault}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="ICL S">{result.input.iclS}</Descriptions.Item>
                    <Descriptions.Item label="ICL C">{result.input.iclC}</Descriptions.Item>
                    <Descriptions.Item label="ICL A">{result.input.iclA}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="Residual S">{result.output.resiDualS}</Descriptions.Item>
                    <Descriptions.Item label="Residual C">{result.output.resiDualC}</Descriptions.Item>
                    <Descriptions.Item label="Residual A">{result.output.resiDualA}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}