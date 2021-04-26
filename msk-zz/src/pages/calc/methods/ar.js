import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function AR() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = useCallback(async (formData) => {
        try {
            const { data } = await calcApi("zzar")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.ar.name" })}</h2>
            <P id="calc.ar.instructions" />
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani Sph" required />
                        <FormItem name="maniCyl" label="Mani Cyl" required />
                        <FormItem name="maniCylAxis" label="Mani Cyl Axis" required />
                        <FormItem name="kf" label="Kf" required />
                        <FormItem name="ks" label="Ks" required />
                        <FormItem name="kf2" label="Kf2" required />
                        <FormItem name="tmrc" label="TMR C" required />
                        <FormItem name="tmra" label="TMR A" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                arAxis: "AR Axis",
                                arCyl: "AR Cyl",
                                arSph: "AR Sph",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
