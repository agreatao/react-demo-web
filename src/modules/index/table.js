import React from "react";
import Bars from "components/bars";
import { Table, Form, Input } from "antd";
import Pagination from "components/pagination";

export default class extends React.Component {
    render() {
        return (
            <div>
                <Bars
                    left={
                        <React.Fragment>
                            <a>新增患者</a>
                        </React.Fragment>
                    }
                >
                    <Filter />
                </Bars>
                <Table />
                <Pagination />
            </div>
        );
    }
}

const Filter = Form.create()(
    class extends React.Component {
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form layout="inline">
                    <Form.Item label="病例号">
                        {getFieldDecorator("code")(<Input />)}
                    </Form.Item>
                </Form>
            );
        }
    }
);
