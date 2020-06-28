import { Descriptions, Input } from 'antd';
import { calcEXOP } from 'api/calc';
import Form from 'components/Form';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export default function EXOP() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        calcEXOP.send(values)
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
        <Tip method="EXOP" tips={['INSTRUCTIONS', 'NOTES', 'STEP']} />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="K" name="k" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'LABEL_INPUT' })}>
                    <Descriptions.Item label="K">{result.input.k}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'LABEL_OUTPUT' })}>
                    <Descriptions.Item label="G-R (μm)">{result.output.gr}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}