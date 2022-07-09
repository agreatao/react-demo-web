import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function LSA() {
  const intl = useIntl();
  const [data, setData] = useState(null);

  const onCalc = async (formData) => {
    try {
      const { data } = await calcApi("zzlsaqd")(formData);
      setData(data);
    } catch (e) {
      setData(null);
      message.error(intl.formatMessage({ id: "text.systemError" }));
    }
  };

  const onReset = () => {
    setData(null);
  };

  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: "calc.lsa_qd.name" })}</h2>
      <P id="calc.lsa_qd.instructions" />
      <P id="calc.lsa_qd.notes" />
      <div className="calc-form-wrapper">
        <Form
          onCalc={onCalc}
          onReset={onReset}
          initialValues={{
            opicZone: 5,
            lsa: -1,
            e: 0,
          }}
        >
          <Row gutter={24}>
            <FormItem name="opicZone" label="Opic Zone (mm)" required disabled />
            <FormItem name="kf" label="Kf (D)" required />
            <FormItem name="e" label="e" required />
            <FormItem name="psa" label="PSA (μm)" required />
            <FormItem name="correctDs" label="Correct DS (D)" required />
            <FormItem name="targetQ" label="Target Q" required />
            <FormItem name="targetLsa" label="Target LSA (D)" required />
          </Row>
        </Form>
        {data && (
          <div className="calc-result">
            <Result
              data={data}
              dataKeys={{
                q: "Target Q",
                qd: "Q.D. (D)",
                td: "Target D",
                nomoD1: "Sug. Nomo",
                nomoD2: "D",
              }}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
