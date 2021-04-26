import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function PC_PRL() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = useCallback(async (formData) => {
        try {
            const { data } = await calcApi("zzpcprl")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.pc_prl.name" })}</h2>
            <P id="calc.pc_prl.instructions" />
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani Sph" required />
                        <FormItem name="maniCyl" label="Mani Cyl" required />
                        <FormItem name="ac" label="AC (mm)" required />
                        <FormItem name="ct" label="CT (μm)" required />
                        <FormItem name="kf" label="Kf" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                pcPrl: "PC-PRL",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
