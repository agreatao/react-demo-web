import React, { useState } from "react";
import Tip from "components/Tip";
import { Input, Button, Upload, Form } from "antd";
import { useIntl } from "react-intl";
import { go } from "components/User";
import { uploadIOL, pay, payStatus } from "api/pay";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";

export default function IOL() {
    const intl = useIntl();
    const history = useHistory();
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
                    payStatus
                        .send({ outTradeNo })
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
            const user = await go();
            // 付费
            const type = "IOL";
            const outTradeNo = moment().format("YYYYMMDDHHmmssSSS");
            let form = await pay.send({ outTradeNo, type });
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
            const uploader = await uploadIOL.send(formData);
            console.log(uploader);
        } catch (e) {
            console.error(e);
        }
    }

    function beforeUpload(file) {
        setFile(file);
        return true;
    }

    function goPage() {
        history.push(`/${lang}/user/list`);
    }

    return (
        <React.Fragment>
            <Tip method="iol" />
            <div className="calculate-wrapper">
                <Form onFinish={upload}>
                    <Button.Group>
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
                                        const suffix = file.name.slice(file.name.lastIndexOf("."));
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
                        <Button type="primary" htmlType="submit">
                            {intl.formatMessage({ id: "btn.upload" })}
                        </Button>
                    </Button.Group>
                    <Button type="link" onClick={goPage}>
                        {intl.formatMessage({ id: "btn.searchResult" })}
                    </Button>
                </Form>
            </div>
        </React.Fragment>
    );
}
