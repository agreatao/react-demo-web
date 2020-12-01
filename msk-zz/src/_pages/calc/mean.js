import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, Input, Space, Table, Upload } from 'antd';
import { calcMEAN, uploadMEAN } from 'api/calc';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export default function MEAN() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });
    const [form] = Form.useForm();

    function calculate(values) {
        calcMEAN.send(values)
            .then(data => {
                console.log(data);
                setResult({ visible: true, output: data, input: values.zzMeanInfos });
            })
            .catch(e => {
                console.error(e);
            });
    }

    function reset() {
        form.resetFields();
    }

    function close() {
        setResult({ visible: false, output: null, input: null, error: null });
    }

    function upload({ file }) {
        const formData = new FormData();
        formData.append('file', file);
        uploadMEAN.send(formData).then(data => {
            const { zzMeanInfos } = data;
            form.setFieldsValue({ zzMeanInfos });
        }).catch(e => { })
    }

    return <React.Fragment>
        <Tip method="mean" />
        <div className="calculate-wrapper">
            <div className="calculate-mean-tip">
                {intl.formatMessage({ id: "calc.mean.tip1" })}（<a href="/file/zzmean.xlsx" target="_blank">{intl.formatMessage({ id: 'btn.clickHere' })}</a>）{intl.formatMessage({ id: "calc.mean.tip2" })}
                <Upload customRequest={upload} showUploadList={false}>
                    <a>{intl.formatMessage({ id: "btn.upload" })}</a>
                </Upload>
            </div>
            <Form className="calculate-form" form={form} initialValues={{
                zzMeanInfos: [{ sph: null, cyl: null, axis: null }]
            }} onFinish={calculate}>
                <Form.List name="zzMeanInfos">
                    {(fields, { add, remove }) => {
                        return <React.Fragment>
                            {fields.map((field, index) =>
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'sph']}
                                        fieldKey={[field.fieldKey, 'sph']}
                                        rules={[{ required: true, message: intl.formatMessage({ id: 'form.rules.required' }) }]}>
                                        <Input placeholder="Sph" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'cyl']}
                                        fieldKey={[field.fieldKey, 'cyl']}
                                        rules={[{ required: true, message: intl.formatMessage({ id: 'form.rules.required' }) }]}>
                                        <Input placeholder="Cyl" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'axis']}
                                        fieldKey={[field.fieldKey, 'axis']}
                                        rules={[{ required: true, message: intl.formatMessage({ id: 'form.rules.required' }) }]}>
                                        <Input placeholder="Axis" />
                                    </Form.Item>
                                    {fields.length > 1 && <MinusCircleOutlined style={{ marginLeft: 8 }} onClick={() => remove(field.name)} style={{ marginTop: 9 }} />}
                                </Space>
                            )}
                            <Button className="calculate-btn" onClick={() => add()}>{intl.formatMessage({ id: 'btn.addRow' })}</Button>
                        </React.Fragment>
                    }}
                </Form.List>
                <Button className="calculate-btn" type="primary" htmlType="submit">{intl.formatMessage({ id: 'btn.calc' })}</Button>
                <Button className="calculate-btn" onClick={reset}>{intl.formatMessage({ id: 'btn.clear' })}</Button>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            <div className="calculate-title">{intl.formatMessage({ id: "LABEL_INPUT" })}</div>
            {result.input && <Table
                size="small"
                pagination={false}
                columns={[
                    { title: 'Sph', dataIndex: 'sph' },
                    { title: 'Cyl', dataIndex: 'cyl' },
                    { title: 'Axis', dataIndex: 'axis' }
                ]}
                dataSource={result.input.map((item, key) => ({ ...item, key }))}
            />}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'LABEL_OUTPUT' })}>
                    <Descriptions.Item label="Mean Sph">{result.output.meanSph}</Descriptions.Item>
                    <Descriptions.Item label="Mean Cyl">{result.output.meanCyl}</Descriptions.Item>
                    <Descriptions.Item label="Mean Axis">{result.output.meanAxis}</Descriptions.Item>
                    <Descriptions.Item label="SD Sph">{result.output.sdSph}</Descriptions.Item>
                    <Descriptions.Item label="SD Cyl">{result.output.sdCyl}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}