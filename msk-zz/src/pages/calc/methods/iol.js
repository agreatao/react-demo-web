import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function IOL() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzcaliol")(formData);
            setData(data);
        } catch (e) {
            setData(null);
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }

    const onReset = () => {
        setData(null);
    }

    return (
        <Fragment>
            <h2>{intl.formatMessage({ id: "calc.iol.name" })}</h2>
            <P id="calc.iol.instructions" />
            <P id="calc.iol.notes" />
            <div className="calc-form-wrapper">
                <Form
                    initialValues={{
                        targetSe: 0,
                        cct: 500,
                        lt: 5,
                    }}
                    onCalc={onCalc}
                    onReset={onReset}
                >
                    <Row gutter={24}>
                        <FormItem name="aConstant" label="A Constant" required />
                        <FormItem name="targetSe" label="Target SE (D)" required />
                        <FormItem name="al" label="AL (mm)" required />
                        <FormItem name="acd" label="ACD (mm)" required />
                        <FormItem name="lt" label="LT (mm)" required />
                        <FormItem name="meanpp" label="Mean PP (D)" required />
                        <FormItem name="cct" label="CCT (μm)" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result data={data} dataKeys={{ iol: "IOL (D)" }} />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
