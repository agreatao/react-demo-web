import { Collapse, Form, Input, Upload, Button, Col, Row } from "antd";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import moment from "moment";
import { go } from "components/User";
import { uploadZcsFile, pay, payStatus } from "api/pay";

const { Panel } = Collapse;

export default function iol() {
    const intl = useIntl();
    const [file, setFile] = useState(null);
    const lang = useSelector((state) => state.locale.lang);

    /**
     * 获取订单支付状态的轮询
     */
    function getPayStatus(outTradeNo) {
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
    }

    async function upload() {
        try {
            // 判断是否登录
            const user = await go("login");
            // 付费
            const type = "IOL";
            const outTradeNo = moment().format("YYYYMMDDHHmmssSSS");
            let form = await pay({ outTradeNo, type });
            const formWrapper = document.createElement("div");
            document.body.append(formWrapper);
            formWrapper.innerHTML = form;
            form = document.getElementsByName("punchout_form");
            form[0].setAttribute("target", "_blank");
            form[0].submit();
            // 调起支付后，每3s获取一次订单状态，直到支付完成结束轮询
            await getPayStatus(outTradeNo);
            // 上传文件
            const formData = new FormData();
            formData.append("file", file);
            formData.append("outTradeNo", outTradeNo);
            formData.append("userId", user.id);
            formData.append("type", type);
            const uploader = await uploadZcsFile(formData);
        } catch (e) {
            console.error(e);
        }
    }

    function beforeUpload(file) {
        setFile(file);
        return true;
    }

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.iol.name" />
        </h1>,
        <Collapse key="collapse" ghost defaultActiveKey={["notes", "rawdata", "pay", "content"]}>
            <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                <FormattedMessage id="calc.iol.notes" />
            </Panel>
            <Panel key="rawdata" header={<FormattedMessage id="tip.title.rawdata" />}>
                <FormattedMessage id="calc.iol.rawdata" />
            </Panel>
            <Panel key="pay" header={<FormattedMessage id="tip.title.pay" />}>
                <FormattedMessage id="calc.iol.pay" />
            </Panel>
            <Panel key="content" header={<FormattedMessage id="text.input" />}>
                <Form>
                    <Row gutter={24}>
                        <Col span={{ sm: 5 }}>
                            <Form.Item
                                name="file"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e.file}
                                rules={[
                                    {
                                        required: true,
                                        message: intl.formatMessage({
                                            id: "form.rules.required.upload",
                                        }),
                                    },
                                    () => ({
                                        validator(_, file) {
                                            if (!file) return Promise.resolve();
                                            const suffix = file.name.slice(
                                                file.name.lastIndexOf(".")
                                            );
                                            if (suffix != ".zcs")
                                                return Promise.reject(
                                                    intl.formatMessage({
                                                        id: "form.rules.upload.zcsError",
                                                    })
                                                );
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Upload
                                    beforeUpload={beforeUpload}
                                    customRequest={() => {}}
                                    showUploadList={false}
                                >
                                    <Input readOnly value={file?.name} />
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={{ sm: 4 }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    <FormattedMessage id="btn.upload" />
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Button type="link" href={`/${lang}/user/list`}>
                    <FormattedMessage id="btn.searchResult" />
                </Button>
            </Panel>
        </Collapse>,
    ];
}
