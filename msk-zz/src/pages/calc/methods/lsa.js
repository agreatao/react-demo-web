import { message, Row, Select } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function LSA() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = useCallback(async (formData) => {
        try {
            const { data } = await calcApi("zzlsa")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.lsa.name" })}</h2>
            <P id="calc.lsa.instructions" />
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="opicZone" label="Opic Zone" required />
                        <FormItem name="vertexK" label="Vertex K" required />
                        <FormItem name="e" label="e" required />
                        <FormItem name="correctSe" label="Correct SE" required />
                        <FormItem name="lsa" label="Δ LSA" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <h4>> 5m</h4>
                        <Result
                            data={data}
                            dataKeys={{
                                farQ: "Δ Q",
                                farExpectQ: "Expect Q",
                            }}
                        />
                        <h4>33cm</h4>
                        <Result
                            data={data}
                            dataKeys={{
                                nearQ: "Δ Q",
                                nearExpectQ: "Expect Q",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
