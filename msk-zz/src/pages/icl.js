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
                <Form.Item label="Mani Cyl Axis" name="maniCylAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="sia D" name="siaD" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="sia A" name="siaA" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Ct" name="ct" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Ac" name="ac" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Kf" name="kf" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Lt" name="lt" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Icl Diameter" name="iclDiameter" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Sts H" name="stsH" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Sts V" name="stsV" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Icl S" name="iclS" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Icl C" name="iclC" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Icl A" name="iclA" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="Mani Sph">{result.input.maniSph}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl">{result.input.maniCyl}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl Axis">{result.input.maniCylAxis}</Descriptions.Item>
                    <Descriptions.Item label="Sia D">{result.input.siaD}</Descriptions.Item>
                    <Descriptions.Item label="Sia A">{result.input.siaA}</Descriptions.Item>
                    <Descriptions.Item label="Ct">{result.input.ct}</Descriptions.Item>
                    <Descriptions.Item label="Ac">{result.input.ac}</Descriptions.Item>
                    <Descriptions.Item label="Kf">{result.input.kf}</Descriptions.Item>
                    <Descriptions.Item label="Lt">{result.input.lt}</Descriptions.Item>
                    <Descriptions.Item label="Icl Diameter">{result.input.iclDiameter}</Descriptions.Item>
                    <Descriptions.Item label="Sts H">{result.input.stsH}</Descriptions.Item>
                    <Descriptions.Item label="Sts V">{result.input.stsV}</Descriptions.Item>
                    <Descriptions.Item label="Icl S">{result.input.iclS}</Descriptions.Item>
                    <Descriptions.Item label="Icl C">{result.input.iclC}</Descriptions.Item>
                    <Descriptions.Item label="Icl A">{result.input.iclA}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="Icl S">{result.output.iclS}</Descriptions.Item>
                    <Descriptions.Item label="Icl C">{result.output.iclC}</Descriptions.Item>
                    <Descriptions.Item label="Icl A">{result.output.iclA}</Descriptions.Item>
                    <Descriptions.Item label="Esti Vault">{result.output.estiVault}</Descriptions.Item>
                    <Descriptions.Item label="Resi Dual S">{result.output.resiDualS}</Descriptions.Item>
                    <Descriptions.Item label="Resi Dual C">{result.output.resiDualC}</Descriptions.Item>
                    <Descriptions.Item label="Resi Dual A">{result.output.resiDualA}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}