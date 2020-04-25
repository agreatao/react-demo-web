import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, Input, Table, Upload } from 'antd';
import { mean, meanUpload } from 'api';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export default function MEAN() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });
    const [form] = Form.useForm();

    function calculate() {
        const values = form.getFieldsValue();
        mean(values)
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
        meanUpload(file).then(({ result }) => {
            const { zzMeanInfos } = result;
            form.setFieldsValue({ zzMeanInfos });
        }).catch(e => { })
    }

    return <React.Fragment>
        <Tip method="MEAN" tips={["INSTRUCTIONS", "NOTES"]} />
        <div className="calculate-wrapper">
            <div className="calculate-mean-tip">
                {intl.formatMessage({ id: "MEAN_TIP_1" })}（<a href="/file/zzmean.xlsx" target="_blank">zz_mean.xlsx</a>），{intl.formatMessage({ id: "MEAN_TIP_3" })}
                <Upload customRequest={upload} showUploadList={false}>
                    <a>{intl.formatMessage({ id: "MEAN_TIP_4" })}</a>
                </Upload>
            </div>
            <Form form={form} component={false} initialValues={{
                zzMeanInfos: [{ sph: null, cyl: null, axis: null, key: 0 }]
            }}>
                <Form.Item name="zzMeanInfos" noStyle>
                    <FormTable />
                </Form.Item>
                <div className="calculate-btn-group">
                    <Button size="large" className="calculate-btn" type="primary" onClick={calculate}>{intl.formatMessage({ id: 'CALCULATE' })}</Button>
                    <Button size="large" className="calculate-btn" onClick={reset}>{intl.formatMessage({ id: 'CLEAR' })}</Button>
                </div>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            <div className="calculate-title">{intl.formatMessage({ id: "INPUT" })}</div>
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
                <Descriptions column={2} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="Mean Sph">{result.output.meanSph}</Descriptions.Item>
                    <Descriptions.Item label="Mean Cyl">{result.output.meanCyl}</Descriptions.Item>
                    <Descriptions.Item label="Mean Axis">{result.output.meanAxis}</Descriptions.Item>
                    <Descriptions.Item label="SD Sph">{result.output.sdSph}</Descriptions.Item>
                    <Descriptions.Item label="SD Cyl">{result.output.sdCyl}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}

function FormTable({ value = [], onChange }) {
    const [dataSource, setDataSource] = useState(value.map((item, key) => ({ ...item, key })));

    useEffect(() => {
        setDataSource(value.map((item, key) => ({ ...item, key })));
    }, [value]);

    function handleChange(rowIndex, dataIndex, val) {
        dataSource[rowIndex][dataIndex] = typeof val === 'string' && !isNaN(val) ? +val : null;
        onChange(dataSource.map(({ key, ...item }) => item));
    }

    const Cell = ({ record, rowIndex, dataIndex, value, children, ...props }) => {
        const [_value, setValue] = useState(value);

        function handleInputChange(e) {
            const _value = e.target.value;
            setValue(_value);
            handleChange(rowIndex, dataIndex, _value);
        }

        if (dataIndex) {
            return <td {...props} style={{ padding: '5px' }}>
                <Input value={_value} onChange={handleInputChange} />
            </td>
        }
        return <td {...props} style={{ padding: '5px 0' }}>{children}</td>
    }

    function handleAdd(rowIndex) {
        dataSource.splice(rowIndex + 1, 0, { sph: null, cyl: null, axis: null, key: dataSource.length });
        setDataSource([...dataSource]);
        onChange(dataSource.map(({ key, ...item }) => item));
    }

    function handleRemove(rowIndex) {
        if (dataSource.length > 1) {
            dataSource.splice(rowIndex, 1);
            setDataSource([...dataSource]);
            onChange(dataSource.map(({ key, ...item }) => item));
        }
    }

    return <Table
        style={{ maxWidth: 460, margin: '0 auto' }}
        pagination={false}
        dataSource={dataSource}
        components={{
            body: {
                cell: Cell
            }
        }}
        columns={[
            { title: 'Sph', dataIndex: 'sph' },
            { title: 'Cyl', dataIndex: 'cyl' },
            { title: 'Axis', dataIndex: 'axis' },
            {
                key: 'operation',
                width: '40px',
                render(text, row, rowIndex) {
                    return <React.Fragment>
                        <PlusCircleOutlined onClick={() => handleAdd(rowIndex)} />
                        <MinusCircleOutlined style={{ marginLeft: 8 }} onClick={() => handleRemove(rowIndex)} />
                    </React.Fragment>
                }
            }
        ].map(item => {
            return {
                ...item,
                onCell(record, rowIndex) {
                    return {
                        rowIndex,
                        record,
                        value: record[item.dataIndex],
                        dataIndex: item.dataIndex
                    }
                }
            }
        })}
    />
}