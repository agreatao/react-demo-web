import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Input, Row, Select, Upload } from "antd";
import calcApi, { readMeanXlsxFile } from "api/calc";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const { Panel } = Collapse;
const { Option } = Select;

const formLayout = {
    labelCol: {
        sm: { span: 10 },
    },
    wrapperCol: {
        sm: { span: 14 },
    },
};

const layout = {
    span: 12,
    xs: 12,
    sm: 6,
};

export default function ok() {
    const intl = useIntl();
    const [form] = Form.useForm();

    async function onSubmit() {
        try {
            const formData = await form.validateFields();
            const { data } = await calcApi("zzmeansdvector")(formData);
            console.log(data);
        } catch (e) {}
    }

    function onReset() {
        form.resetFields();
    }

    async function upload({ file }) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const { data } = await readMeanXlsxFile(formData);
            const { zzMeanInfos } = data;
            form.setFieldsValue({ zzMeanInfos });
        } catch (e) {}
    }

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.ok.name" />
        </h1>,
        <Collapse
            key="collapse"
            ghost
            defaultActiveKey={["instructions", "notes", "rawdata", "pay", "content"]}
        >
            <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                <FormattedMessage id="calc.ok.instructions" />
            </Panel>
            <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                <FormattedMessage id="calc.ok.notes" />
            </Panel>
            <Panel key="content" header={<FormattedMessage id="text.input" />}>
                <div className="calculate-mean-help" style={{ marginBottom: 8 }}>
                    <FormattedMessage id="calc.mean.tip1" />（
                    <a href="/file/zzmean.xlsx" target="_blank">
                        {intl.formatMessage({ id: "btn.clickHere" })}
                    </a>
                    ）<FormattedMessage id="calc.mean.tip2" />
                    <Upload customRequest={upload} showUploadList={false}>
                        <a>
                            <FormattedMessage id="btn.upload" />
                        </a>
                    </Upload>
                </div>
                <Form
                    form={form}
                    {...formLayout}
                    validateMessages={{
                        required: intl.formatMessage({ id: "form.rules.required.field" }),
                    }}
                    initialValues={{
                        zzMeanInfos: [{ sph: null, cyl: null, axis: null }],
                    }}
                >
                    <Form.List name="zzMeanInfos">
                        {(fields, { add, remove }) => {
                            return (
                                <React.Fragment>
                                    {fields.map((field, index) => (
                                        <Row key={field.key} gutter={24}>
                                            <Col {...layout}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "sph"]}
                                                    fieldKey={[field.fieldKey, "sph"]}
                                                    rules={[{ required: true }]}
                                                    label="Sph"
                                                >
                                                    <Input placeholder="Sph" autoComplete="off" />
                                                </Form.Item>
                                            </Col>
                                            <Col {...layout}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "cyl"]}
                                                    fieldKey={[field.fieldKey, "cyl"]}
                                                    rules={[{ required: true }]}
                                                    label="Cyl"
                                                >
                                                    <Input placeholder="Cyl" autoComplete="off" />
                                                </Form.Item>
                                            </Col>
                                            <Col {...layout}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "axis"]}
                                                    fieldKey={[field.fieldKey, "axis"]}
                                                    rules={[{ required: true }]}
                                                    label="Axis"
                                                >
                                                    <Input placeholder="Axis" autoComplete="off" />
                                                </Form.Item>
                                            </Col>
                                            <Col {...layout}>
                                                {fields.length > 1 && (
                                                    <MinusCircleOutlined
                                                        style={{ fontSize: 16, margin: 8 }}
                                                        onClick={() => remove(field.name)}
                                                    />
                                                )}
                                                {index === fields.length - 1 && (
                                                    <PlusCircleOutlined
                                                        style={{ fontSize: 16, margin: 8 }}
                                                        onClick={() => add()}
                                                    />
                                                )}
                                            </Col>
                                        </Row>
                                    ))}
                                </React.Fragment>
                            );
                        }}
                    </Form.List>
                </Form>
                <div className="calc-btn__wrapper">
                    <Button className="calc-btn" type="primary" onClick={onSubmit}>
                        <FormattedMessage id="btn.calc" />
                    </Button>
                    <Button className="calc-btn" onClick={onReset}>
                        <FormattedMessage id="btn.clear" />
                    </Button>
                </div>
            </Panel>
        </Collapse>,
    ];
}
