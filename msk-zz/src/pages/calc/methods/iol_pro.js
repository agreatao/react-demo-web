import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function IOL_PRO() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = useCallback(async (formData) => {
        try {
            // 登录流程

            // 付费流程

            const { data } = await calcApi("zziol")(formData);
            setData(data);
        } catch (e) {
            setData(null);
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }, []);

    const onReset = useCallback(() => {
        setData(null);
    }, []);

    return (
        <Fragment>
            <h2>{intl.formatMessage({ id: "calc.iol_pro.name" })}</h2>
            <P id="calc.iol_pro.instructions" />
            <P id="calc.iol_pro.rawdata" />
            <P id="calc.iol_pro.pay" />
            <div className="calc-form-wrapper">
                <Form
                    initialValues={{
                        ct: 500,
                        lt: 5,
                    }}
                    onCalc={onCalc}
                    onReset={onReset}
                >
                    <Row gutter={24}>
                        <FormItem name="aConstant" label="A Constant" required />
                        <FormItem name="targetSe" label="Target SE" required />
                        <FormItem name="ct" label="CT (μm)" required />
                        <FormItem name="ac" label="AC (mm)" required />
                        <FormItem name="kf" label="Kf (D)" required />
                        <FormItem name="kb" label="Kb (D)" required />
                        <FormItem name="al" label="AL (mm)" required />
                        <FormItem name="lt" label="LT (mm)" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                iol: "IOL (D)",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
