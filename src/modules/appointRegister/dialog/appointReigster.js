import { Button, DatePicker, Form, Input, Select, Spin } from "antd";
import { TextArea } from "components/form";
import { appointTimes } from "dic";
import React from "react";
import http from "utils/http";
import debounce from 'lodash/debounce';

const { Option } = Select;

export default Form.create()(
    class AppointRegister extends React.Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
                http.post("/appoint/appointRegister", values).then(() => {
                    this.props.onSuccess && this.props.onSuccess();
                });
            });
        };
        handleReset = e => {
            e.preventDefault();
            this.props.form.resetFields();
            this.props.onCancel && this.props.onCancel();
        };
        constructor(props) {
            super(props);
            this.lastLoadId = 0;
            this.loadDoctors = debounce(this.loadDoctors, 800);
        }
        state = {
            loading: false,
            doctors: []
        };
        componentDidMount() {
            this.mounted = true;
            this.loadDoctors();
        }
        loadDoctors = doctorName => {
            this.lastLoadId += 1;
            const loadId = this.lastLoadId;
            if (this.mounted)
                this.setState({ doctors: [], loading: true });
            http.get("/doctors", { params: { doctorName } }).then(data => {
                if (loadId !== this.lastLoadId) return;
                if (this.mounted) {
                    this.setState({ doctors: data.result, loading: false });
                }
            });
        }
        componentWillUnmount() {
            this.mounted = false;
            http.cancel();
        }
        render() {
            const { data } = this.props;
            const { getFieldDecorator } = this.props.form;

            const { loading, doctors } = this.state;

            return (
                <Form>
                    <div className="form-modal-title">{data ? "修改" : "新增"}挂号预约</div>
                    <div style={{ padding: "0 25px" }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: 1 }}>
                                <Form.Item colon={false} label="手机">
                                    {getFieldDecorator("phone")(<Input autoComplete="off" />)}
                                </Form.Item>
                                <Form.Item colon={false} label="预约时间">
                                    {getFieldDecorator("appointDate")(<DatePicker format="YYYY-MM-DD" />)}
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Form.Item colon={false} label="姓名">
                                    {getFieldDecorator("name")(<Input autoComplete="off" />)}
                                </Form.Item>
                                <Form.Item colon={false} label="时间段">
                                    {getFieldDecorator("appointTime")(
                                        <Select>
                                            {appointTimes.map(item => (
                                                <Option value={item.value} key={item.value}>{item.text}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item colon={false} label="预约医生">
                            {getFieldDecorator("doctorId")(<Select
                                showSearch
                                showArrow={false}
                                notFoundContent={loading ? <Spin size="small" /> : null}
                                filterOption={false}
                                onSearch={this.loadDoctors}
                            >
                                {doctors.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                            </Select>)}
                        </Form.Item>
                        <Form.Item colon={false} label="备注">
                            {getFieldDecorator("remark")(<TextArea max={100} rows={5} />)}
                        </Form.Item>
                    </div>
                    <div className="form-modal-button">
                        <Button type="primary" onClick={this.handleSubmit}>{data ? "修改" : "保存"}</Button>
                        <Button onClick={this.handleReset}>取消</Button>
                    </div>
                </Form>
            );
        }
    }
);