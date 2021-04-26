import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function ICL() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = useCallback(async (formData) => {
        try {
            const { data } = await calcApi("zziclvault")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.icl_vault.name" })}</h2>
            <P id="calc.icl_vault.instructions" />
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="iclDiameter" label="Icl Diameter" required />
                        <FormItem name="htov" label="H(0) to V(90)" required />
                        <FormItem name="lt" label="LT (mm)" required />
                        <FormItem name="stsh" label="STS-H (mm)" required />
                        <FormItem name="stsv" label="STS-V (mm)" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                estiVault: "Esti Vault",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
