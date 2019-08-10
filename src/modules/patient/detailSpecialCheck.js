import React from "react";
import { connect } from "react-redux";
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";

const { Option } = Select;

export default connect(state => ({ browser: state.browser }))(
    Form.create()(
        class extends React.Component {
            state = {
                edit: false,
                data: null
            };
            render() {
                const { height } = this.props.browser;
                const { data, edit } = this.state;
                const { getFieldDecorator } = this.props.form;
                const layout = {
                    labelCol: {
                        sm: { span: 5 }
                    },
                    wrapperCol: {
                        sm: { span: 12 }
                    }
                };
                return data ? (
                    <Form
                        className="tab-page check-form"
                        style={{ height: height - 166 }}
                    >
                        <Form.Item {...layout} label="报告类型">
                            {edit ? (
                                getFieldDecorator("temp")(
                                    <Select>
                                        <Option value="近视激光检查">
                                            近视激光检查
                                        </Option>
                                        <Option value="ICL检查">ICL检查</Option>
                                        <Option value="角膜接触镜检查">
                                            角膜接触镜检查
                                        </Option>
                                    </Select>
                                )
                            ) : (
                                <span className="ant-form-text">
                                    近视激光检查
                                </span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="主治医生">
                            {edit ? (
                                getFieldDecorator("doctor")(
                                    <Select>
                                        <Option value="你好">你好</Option>
                                    </Select>
                                )
                            ) : (
                                <span className="ant-form-text">你好</span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="检查时间">
                            {edit ? (
                                getFieldDecorator("checkTime")(
                                    <DatePicker
                                        showTime
                                        style={{ width: "100%" }}
                                    />
                                )
                            ) : (
                                <span className="ant-form-text">
                                    2019-10-20
                                </span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="检查设备">
                            {edit ? (
                                getFieldDecorator("device")(<Input />)
                            ) : (
                                <span className="ant-form-text">ICT</span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="检查眼睛">
                            {edit ? (
                                getFieldDecorator("eye")(
                                    <Radio.Group>
                                        <Radio value={1}>左眼</Radio>
                                        <Radio value={2}>右眼</Radio>
                                    </Radio.Group>
                                )
                            ) : (
                                <span className="ant-form-text">左眼</span>
                            )}
                        </Form.Item>
                        <hr />
                        <div className="check-icon">
                            <div className="left" />
                            <div className="right" />
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <span className="name">远</span>
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("far")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">
                                            10.00
                                        </span>
                                    )}
                                </Form.Item>
                                <span className="name">近</span>
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">
                                            5.00
                                        </span>
                                    )}
                                </Form.Item>
                            </div>
                            <label className="label">裸眼视力</label>
                            <div className="right">
                                <span className="name">远</span>
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("far")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">
                                            5.00
                                        </span>
                                    )}
                                </Form.Item>
                                <span className="name">近</span>
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">
                                            5.00
                                        </span>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">
                                            10
                                        </span>
                                    )}
                                </Form.Item>
                            </div>
                            <label className="label">电脑验光</label>
                            <div className="right">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">
                                            10
                                        </span>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">5</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                            <label className="label">瞳孔直径</label>
                            <div className="right">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">5</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">5</span>
                                    )}
                                </Form.Item>
                                <span className="name">mmHg</span>
                            </div>
                            <label className="label">眼压</label>
                            <div className="right">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">5</span>
                                    )}
                                </Form.Item>
                                <span className="name">mmHg</span>
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">5</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                            <label className="label">眼轴长度</label>
                            <div className="right">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("low")(<Input />)
                                    ) : (
                                        <span className="ant-form-text">5</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                        </div>
                        {edit ? (
                            getFieldDecorator("test")(
                                <Radio.Group
                                    className="check-form-item"
                                    buttonStyle="solid"
                                >
                                    <div className="left">
                                        <Radio.Button value="a">
                                            OD
                                        </Radio.Button>
                                    </div>
                                    <label className="label">主视眼</label>
                                    <div className="right">
                                        <Radio.Button value="b">
                                            OS
                                        </Radio.Button>
                                    </div>
                                </Radio.Group>
                            )
                        ) : (
                            <div className="ant-radio-group check-form-item">
                                <div className="left">
                                    <span className="ant-radio-button-wrapper ant-radio-button-wrapper-checked">
                                        OD
                                    </span>
                                </div>
                                <label className="label">主视眼</label>
                                <div className="right">
                                    <span className="ant-radio-button-wrapper">
                                        OS
                                    </span>
                                </div>
                            </div>
                        )}
                        {edit ? (
                            <div className="btn-group">
                                <Button
                                    onClick={e =>
                                        this.setState({ edit: false, data: null })
                                    }
                                >
                                    返回
                                </Button>
                                <Button
                                    type="primary"
                                    style={{ marginLeft: 10 }}
                                >
                                    保存
                                </Button>
                            </div>
                        ) : (
                            <div className="btn-group">
                                <Button
                                    onClick={e => this.setState({ edit: true })}
                                    type="primary"
                                >
                                    编辑
                                </Button>
                            </div>
                        )}
                    </Form>
                ) : (
                    <div className="tab-page">
                        <div className="btn-group">
                            <Button
                                type="primary"
                                onClick={e => this.setState({ data: {}, edit: true })}
                            >
                                添加特检报告
                            </Button>
                        </div>
                    </div>
                );
            }
        }
    )
);
