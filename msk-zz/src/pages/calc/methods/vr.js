import { message, Row, Select } from "antd";
import calcApi from "api/calc";
import DataChart from "components/Chart/DataChart";
import React, { Fragment, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

const { Option } = Select;

export default function VR() {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const [version, setVersion] = useState("1.1");

    const onCalc = useCallback(async (formData) => {
        try {
            const { data } = await calcApi("formulavr")({ ...formData, version });
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
            <h2>
                {intl.formatMessage({ id: "calc.vr.name" })}
                <Select
                    value={version}
                    onChange={(version) => setVersion(version)}
                    style={{ width: 76, marginLeft: 12 }}
                    size="small"
                >
                    <Option value="1.0">v 1.0</Option>
                    <Option value="1.1">v 1.1</Option>
                </Select>
            </h2>
            <P id="calc.vr.instructions" />
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset} initialValues={{ opicZone: 6.5 }}>
                    <Row gutter={24}>
                        <FormItem name="opicZone" label="Opic Zone (mm)" required />
                        <FormItem name="c7" label="C7" required />
                        <FormItem name="c8" label="C8" required />
                        <FormItem name="c11" label="C11" required />
                        <FormItem name="c12" label="C12" required />
                        <FormItem name="c13" label="C13" required />
                    </Row>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani Sph" required />
                        <FormItem name="maniCyl" label="Mani Cyl" required />
                        <FormItem name="maniCylAxis" label="Mani Cyl Axis" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                vrSph: "VR Sph",
                                vrCyl: "VR Cyl",
                                vrAxis: "VR Axis",
                            }}
                        />
                        <DataChart
                            data={
                                data && [
                                    [+data.maniCyl, +data.maniAxis, "Manifest Astigmatism"],
                                    [+data.comaCyl, +data.comaAxis, "COMA Astigmatism"],
                                    [+data.secAstiD1, 135, "Secondary Astigmatism D1"],
                                    [+data.secAstiD2, 90, "Secondary Astigmatism D2"],
                                    [+data.vrCyl, +data.vrAxis, "VR"],
                                ]
                            }
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
}
