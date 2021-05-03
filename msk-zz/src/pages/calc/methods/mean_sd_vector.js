import { message, Row } from "antd";
import calcApi from "api/calc";
import DataChart from "components/Chart/DataChart";
import React, { Fragment, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function MEAN_SD_VECTOR() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = useCallback(async (formData) => {
        try {
            const { data } = await calcApi("zzmeansdvector")(formData);
            setData({ ...data, ...formData });
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
            <h2>{intl.formatMessage({ id: "calc.mean_sd_vector.name" })}</h2>
            <P id="calc.mean_sd_vector.instructions" />
            <div className="calc-form-wrapper">
                <Form
                    onCalc={onCalc}
                    onReset={onReset}
                    initialValues={{
                        zzMeanInfos: [{ sph: null, cyl: null, axis: null }],
                    }}
                >
                    
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                meanSph: "Mean Sph",
                                meanCyl: "Mean Cyl",
                                meanAxis: "Mean Axis",
                                sdSph: "Sd Sph",
                                sdCyl: "Sd Cyl",
                            }}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
