import React from "react";
import http from "utils/http";
import { Form } from "antd";

const layout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 18 },
    },
    colon: false
};

export default class SickHistory extends React.Component {
    state = {
        data: null
    }
    componentDidMount() {
        const { sickInfoId } = this.props;
        http.get("/sick/querySickHistory", { params: { sickInfoId } }).then(data => {
            this.setState({ data: data.result })
        })
    }
    render() {
        const { data } = this.state;
        console.log(data);
        return <Form style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <Form.Item {...layout} label="视力减退">
                    <span className="ant-form-text">{data && data.sljt}</span>
                </Form.Item>
                <Form.Item {...layout} label="视力减退">
                    <span className="ant-form-text">{data && data.sljt}</span>
                </Form.Item>
            </div>
            <div style={{ flex: 1 }}>

            </div>
        </Form>
    }
}