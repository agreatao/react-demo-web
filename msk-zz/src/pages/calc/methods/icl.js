import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function ICL() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzicl")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.icl.name" })}</h2>
            <P id="calc.icl.instructions" />
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani Sph" required />
                        <FormItem name="maniCyl" label="Mani Cyl" required />
                        <FormItem name="maniCylAxis" label="Mani Cyl Axis" required />
                        <FormItem name="siaD" label="SIA D" required />
                        <FormItem name="siaA" label="SIA A" required />
                        <FormItem name="ct" label="CT (μm)" required />
                        <FormItem name="ac" label="AC (mm)" required />
                        <FormItem name="kf" label="Kf" required />
                        <FormItem name="lt" label="LT (mm)" required />
                        <FormItem name="iclDiameter" label="Icl Diameter" required />
                        <FormItem name="htov" label="H(0) to V(90)" required />
                        <FormItem name="stsH" label="STS-H (mm)" required />
                        <FormItem name="stsV" label="STS-V (mm)" required />
                        <FormItem name="iclS" label="ICL S" required />
                        <FormItem name="iclC" label="ICL C" required />
                        <FormItem name="iclA" label="ICL A" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                estiVault: "Esti Vault",
                                iclS: "ICL S",
                                iclC: "ICL C",
                                iclA: "ICL A",
                                resiDualS: "Residual S",
                                resiDualC: "Residual C",
                                resiDualA: "Residual A",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
