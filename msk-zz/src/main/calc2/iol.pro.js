import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Input, message, Row, Spin } from "antd";
import calcApi from "api/calc";
import { pay } from "api/pay";
import CalcResult from "CalcResult";
import { go } from "components/User";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const { Panel } = Collapse;

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
    xs: 24,
    sm: 12,
};

export default function iolpro() {
    const intl = useIntl();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [activeKey, setActiveKey] = useState([
        "instructions",
        "notes",
        "rawdata",
        "pay",
        "input",
    ]);

    const getPayStatus = useCallback(() => {
        return new Promise((resolve, reject) => {
            let timer;
            function loop() {
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    payStatus({ outTradeNo })
                        .then(({ status }) => {
                            if (status === "WAIT_BUYER_PAY")
                                // 等待付款
                                loop();
                            else if (status === "TRADE_SUCCESS")
                                // 完成付款
                                resolve(status);
                            else reject(status);
                        })
                        .catch((e) => reject(e));
                }, 3000);
            }
            loop();
        });
    }, []);

    const onSubmit = useCallback(async () => {
        try {
            // 判断是否登录
            const user = await go("login");
            // 付费
            const outTradeNo = moment().format("YYYYMMDDHHmmssSSS");
            let form = await pay({ outTradeNo, type: "iol.pro" });
            const formWrapper = document.createElement("div");
            document.body.append(formWrapper);
            formWrapper.innerHTML = form;
            form = document.getElementsByName("punchout_form");
            form[0].setAttribute("target", "_blank");
            form[0].submit();
            // 调起支付后，每3s获取一次订单状态，直到支付完成结束轮询
            await getPayStatus(outTradeNo);

            const formData = await form.validateFields();
            formData.outTradeNo = outTradeNo;
            setLoading(true);
            const { data } = await calcApi("zziol")(formData);
            setLoading(false);
            setData(data);
            activeKey.remove("input");
            activeKey.push("output");
            setActiveKey([...activeKey]);
        } catch (e) {
            console.log(e);
            setLoading(false);
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }, []);

    const onReset = useCallback((e) => {
        form.resetFields();
        onClose(e);
    }, []);

    const onClose = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        activeKey.remove("output");
        activeKey.push("input");
        setActiveKey([...activeKey]);
        setData(null);
    }, []);

    const onActiveChange = useCallback((activeKey) => {
        setActiveKey(activeKey);
    }, []);

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.iol.pro.name" />
        </h1>,
        <Spin key="collapse" spinning={loading}>
            <Collapse ghost activeKey={activeKey} onChange={onActiveChange}>
                <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({ id: "calc.iol.pro.instructions" }),
                        }}
                    />
                </Panel>
                <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                    <FormattedMessage id="calc.iol.pro.notes" />
                </Panel>
                <Panel key="rawdata" header={<FormattedMessage id="tip.title.rawdata" />}>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({ id: "calc.iol.pro.rawdata" }),
                        }}
                    />
                </Panel>
                <Panel key="pay" header={<FormattedMessage id="tip.title.pay" />}>
                    <FormattedMessage id="calc.iol.pro.pay" />
                </Panel>
                <Panel key="input" header={<FormattedMessage id="text.input" />}>
                    <Form
                        form={form}
                        {...formLayout}
                        validateMessages={{
                            required: intl.formatMessage({ id: "form.rules.required.field" }),
                        }}
                        initialValues={{
                            ct: 500,
                            lt: 5,
                        }}
                    >
                        <Row gutter={24}>
                            <Col {...layout}>
                                <Form.Item
                                    label="A Constant"
                                    name="aConstant"
                                    rules={[{ required: true }]}
                                >
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item
                                    label="Target SE"
                                    name="targetSe"
                                    rules={[{ required: true }]}
                                >
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="CT (μm)" name="ct" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="AC (mm)" name="ac" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="Kf(D)" name="kf" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="Kb(D)" name="kb" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="AL (mm)" name="al" rules={[{ required: true }]}>
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                            <Col {...layout}>
                                <Form.Item label="LT (mm)" name="lt">
                                    <Input autoComplete="off" />
                                </Form.Item>
                            </Col>
                        </Row>
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
                {data && (
                    <Panel
                        key="output"
                        header={<FormattedMessage id="text.output" />}
                        extra={<CloseOutlined onClick={onClose} />}
                    >
                        <CalcResult
                            data={data}
                            dataKeys={{
                                iol: "IOL(D)",
                            }}
                        />
                    </Panel>
                )}
            </Collapse>
        </Spin>,
    ];
}
