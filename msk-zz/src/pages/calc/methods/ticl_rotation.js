import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function TICL_ROTATION() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzticl")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.ticl_rotation.name" })}</h2>
            <P id="calc.ticl_rotation.instructions" />
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani S (D)" required />
                        <FormItem name="maniCyl" label="Mani C (D)" required />
                        <FormItem name="maniCylAxis" label="Mani Ax" required />
                        <FormItem name="resiSph" label="Residual S (D)" required />
                        <FormItem name="resiCyl" label="Residual C (D)" required />
                        <FormItem name="resiCylAxis" label="Residual Ax" required />
                        <FormItem name="siaD" label="SIA (D)" required />
                        <FormItem name="siaAxis" label="SIA Ax" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                antiClockwise: data.type,
                                estiSph: "Esti Sph",
                                estiCyl: "Esti Cyl",
                                estiCylAxis: "Esti Cyl Axis",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
