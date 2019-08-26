import React from "react";
import { connect } from "react-redux";
import { Button, DatePicker, Form, Input, Radio, Select, Upload, Icon } from "antd";
import { Image } from "x-react-component";
import http from "utils/http";

const { Option } = Select;

import { specialReportType } from "lib/dic";
import { imagePreview } from "components/image";

export default connect(state => ({ browser: state.browser }))(
    Form.create()(
        class extends React.Component {
            state = {
                edit: false,
                data: null,
                imageUrl: null,

                doctors: null
            };
            loadData(sickId) {
                http.get("/sick/querySickSpecialCheck", { params: { sickId } })
                    .then(data => {
                        this.data = data.result;
                        this.setState({ data: data.result, edit: false });
                    })
                    .catch(e => {});
            }
            componentDidMount() {
                if (this.props.dataKey) this.loadData(this.props.dataKey);
                http.post("/user/getUserInfoList", { status: 1, roleId: 2 }).then(data => {
                    this.setState({
                        doctors: data.result
                    });
                });
            }
            componentWillReceiveProps(nextProps) {
                if (!nextProps.dataKey) {
                    this.data = null;
                    this.setState({ data: null, edit: false });
                } else if (nextProps.dataKey != this.props.dataKey) this.loadData(nextProps.dataKey);
            }
            handleSubmit = e => {
                e.preventDefault();
                this.props.form.validateFields((err, values) => {
                    if (err) return;
                    if (this.data && this.data.id != null) values.id = this.data.id;
                    console.log(values);
                    http.form("/sick/imageUpload", {
                        file: values.image,
                        sickInfoId: this.props.dataKey
                    })
                        .then(data => {
                            console.log(data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    // values.sickInfoId = this.props.dataKey;
                    // http.post(this.data && this.data.id != null ? "/sick/updateSickSpecialCheck" : "/sick/addSickSpecialCheck").then(() => {
                    //     this.loadData(this.props.dataKey);
                    // });
                });
            };
            handleCreate = e => {
                e.preventDefault();
                this.setState({ edit: true, data: {} });
            };
            render() {
                const { height } = this.props.browser;
                const { data, edit, imageUrl, doctors } = this.state;
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
                    <Form className="tab-page check-form" style={{ height: height - 166 }}>
                        <Form.Item {...layout} label="报告类型">
                            {edit ? (
                                getFieldDecorator("reportType", {
                                    initialValue: data && data.reportType
                                })(
                                    <Select>
                                        {specialReportType.map((item, index) => (
                                            <Option key={index} value={item.value}>
                                                {item.text}
                                            </Option>
                                        ))}
                                    </Select>
                                )
                            ) : (
                                <span className="ant-form-text">{(data && specialReportType.filter(item => item.value == data.reportType)[0]) || ""}</span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="主治医生">
                            {edit ? (
                                getFieldDecorator("doctorId", {
                                    initialValue: data && data.doctorId
                                })(
                                    <Select>
                                        {doctors &&
                                            doctors.map((item, index) => (
                                                <Option key={index} value={item.id}>
                                                    {item.nickName}
                                                </Option>
                                            ))}
                                    </Select>
                                )
                            ) : (
                                <span className="ant-form-text">{data && data.doctorId}</span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="检查时间">
                            {edit ? (
                                getFieldDecorator("checkTime", {
                                    initialValue: data && data.checkTime
                                })(<DatePicker showTime style={{ width: "100%" }} />)
                            ) : (
                                <span className="ant-form-text">{data && data.checkTime}</span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="检查设备">
                            {edit ? (
                                getFieldDecorator("checkEquipment", {
                                    initialValue: data && data.checkEquipment
                                })(<Input autoComplete="off" />)
                            ) : (
                                <span className="ant-form-text">{data && data.checkEquipment}</span>
                            )}
                        </Form.Item>
                        <Form.Item {...layout} label="医学影像">
                            {edit ? (
                                getFieldDecorator("image", {
                                    getValueFromEvent: e => {
                                        let reader = new FileReader();
                                        reader.readAsDataURL(e.file);
                                        reader.addEventListener("load", e => {
                                            this.setState({ imageUrl: reader.result });
                                        });
                                        return e && e.file;
                                    }
                                })(
                                    <Upload name="" action="" showUploadList={false} listType="picture-card" beforeUpload={() => false}>
                                        {imageUrl ? <Image src={imageUrl} width={100} height={100} /> : <Icon type="file-image" style={{ fontSize: 40 }} />}
                                    </Upload>
                                )
                            ) : (
                                <Image src={imageUrl} width={100} height={100} onClick={e => imagePreview(imageUrl)} />
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
                                        getFieldDecorator("left1", {
                                            initialValue: data && data.left1
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.left1}</span>
                                    )}
                                </Form.Item>
                                <span className="name">近</span>
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("left2", {
                                            initialValue: data && data.left2
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.left2}</span>
                                    )}
                                </Form.Item>
                            </div>
                            <label className="label">裸眼视力</label>
                            <div className="right">
                                <span className="name">远</span>
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("right1", {
                                            initialValue: data && data.right1
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.right1}</span>
                                    )}
                                </Form.Item>
                                <span className="name">近</span>
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("right2", {
                                            initialValue: data && data.right2
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.right2}</span>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                {edit ? (
                                    <div style={{ display: "flex" }}>
                                        <Form.Item>
                                            {getFieldDecorator("left3", {
                                                initialValue: data && data.left3
                                            })(<Input autoComplete="off" />)}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator("left4", {
                                                initialValue: data && data.left4
                                            })(<Input autoComplete="off" />)}
                                        </Form.Item>
                                        <span className="name">X</span>
                                        <Form.Item>
                                            {getFieldDecorator("left5", {
                                                initialValue: data && data.left5
                                            })(<Input autoComplete="off" />)}
                                        </Form.Item>
                                    </div>
                                ) : (
                                    <Form.Item>
                                        <span className="ant-form-text">
                                            {data && data.left3} {data && data.left4} X {data && data.left5}
                                        </span>
                                    </Form.Item>
                                )}
                            </div>
                            <label className="label">电脑验光</label>
                            <div className="right">
                                {edit ? (
                                    <div style={{ display: "flex" }}>
                                        <Form.Item>
                                            {getFieldDecorator("right3", {
                                                initialValue: data && data.right3
                                            })(<Input autoComplete="off" />)}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator("right4", {
                                                initialValue: data && data.right4
                                            })(<Input autoComplete="off" />)}
                                        </Form.Item>
                                        <span className="name">X</span>
                                        <Form.Item>
                                            {getFieldDecorator("right5", {
                                                initialValue: data && data.right5
                                            })(<Input autoComplete="off" />)}
                                        </Form.Item>
                                    </div>
                                ) : (
                                    <Form.Item>
                                        <span className="ant-form-text">
                                            {data && data.right3} {data && data.right4} X {data && data.right5}
                                        </span>
                                    </Form.Item>
                                )}
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("left6", {
                                            initialValue: data && data.left6
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.left6}</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                            <label className="label">瞳孔直径</label>
                            <div className="right">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("right6", {
                                            initialValue: data && data.right6
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.right6}</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("left7", {
                                            initialValue: data && data.left7
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.left7}</span>
                                    )}
                                </Form.Item>
                                <span className="name">mmHg</span>
                            </div>
                            <label className="label">眼压</label>
                            <div className="right">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("right7", {
                                            initialValue: data && data.right7
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.right7}</span>
                                    )}
                                </Form.Item>
                                <span className="name">mmHg</span>
                            </div>
                        </div>
                        <div className="check-form-item">
                            <div className="left">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("left8", {
                                            initialValue: data && data.left8
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.left8}</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                            <label className="label">眼轴长度</label>
                            <div className="right">
                                <Form.Item>
                                    {edit ? (
                                        getFieldDecorator("right8", {
                                            initialValue: data && data.right8
                                        })(<Input autoComplete="off" />)
                                    ) : (
                                        <span className="ant-form-text">{data && data.right8}</span>
                                    )}
                                </Form.Item>
                                <span className="name">mm</span>
                            </div>
                        </div>
                        {edit ? (
                            getFieldDecorator("mainEye", {
                                initialValue: data && data.mainEye
                            })(
                                <Radio.Group className="check-form-item" buttonStyle="solid">
                                    <div className="left">
                                        <Radio.Button value="OD">OD</Radio.Button>
                                    </div>
                                    <label className="label">主视眼</label>
                                    <div className="right">
                                        <Radio.Button value="OS">OS</Radio.Button>
                                    </div>
                                </Radio.Group>
                            )
                        ) : (
                            <div className="ant-radio-group check-form-item">
                                <div className="left">
                                    <span
                                        className={classnames("ant-radio-button-wrapper", {
                                            "ant-radio-button-wrapper-checked": data && data.mainEye === "OD"
                                        })}
                                    >
                                        OD
                                    </span>
                                </div>
                                <label className="label">主视眼</label>
                                <div className="right">
                                    <span
                                        className={classnames("ant-radio-button-wrapper", {
                                            "ant-radio-button-wrapper-checked": data && data.mainEye === "OS"
                                        })}
                                    >
                                        OS
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="check-form-item">
                            <div className="left">
                                <div>
                                    {edit ? (
                                        <div style={{ display: "flex" }}>
                                            <Form.Item>
                                                {getFieldDecorator("left9", {
                                                    initialValue: data && data.left9
                                                })(<Input autoComplete="off" />)}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator("left10", {
                                                    initialValue: data && data.left10
                                                })(<Input autoComplete="off" />)}
                                            </Form.Item>
                                            <span className="name">X</span>
                                            <Form.Item>
                                                {getFieldDecorator("left11", {
                                                    initialValue: data && data.left11
                                                })(<Input autoComplete="off" />)}
                                            </Form.Item>
                                        </div>
                                    ) : (
                                        <Form.Item>
                                            <span className="ant-form-text">
                                                {data && data.left9} {data && data.left10} X {data && data.left11}
                                            </span>
                                        </Form.Item>
                                    )}
                                    <div style={{ display: "flex" }}>
                                        <span className="name">远</span>
                                        <Form.Item>
                                            {edit ? (
                                                getFieldDecorator("left12", {
                                                    initialValue: data && data.left12
                                                })(<Input autoComplete="off" />)
                                            ) : (
                                                <span className="ant-form-text">{data && data.left12}</span>
                                            )}
                                        </Form.Item>
                                        <span className="name">近</span>
                                        <Form.Item>
                                            {edit ? (
                                                getFieldDecorator("left13", {
                                                    initialValue: data && data.left13
                                                })(<Input autoComplete="off" />)
                                            ) : (
                                                <span className="ant-form-text">{data && data.left13}</span>
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <label className="label">主觉验光</label>
                            <div className="right">
                                <div>
                                    {edit ? (
                                        <div style={{ display: "flex" }}>
                                            <Form.Item>
                                                {getFieldDecorator("right9", {
                                                    initialValue: data && data.right9
                                                })(<Input autoComplete="off" />)}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator("right10", {
                                                    initialValue: data && data.right10
                                                })(<Input autoComplete="off" />)}
                                            </Form.Item>
                                            <span className="name">X</span>
                                            <Form.Item>
                                                {getFieldDecorator("right11", {
                                                    initialValue: data && data.right11
                                                })(<Input autoComplete="off" />)}
                                            </Form.Item>
                                        </div>
                                    ) : (
                                        <Form.Item>
                                            <span className="ant-form-text">
                                                {data && data.right9} {data && data.right10} X {data && data.right11}
                                            </span>
                                        </Form.Item>
                                    )}
                                    <div style={{ display: "flex" }}>
                                        <span className="name">远</span>
                                        <Form.Item>
                                            {edit ? (
                                                getFieldDecorator("right12", {
                                                    initialValue: data && data.right12
                                                })(<Input autoComplete="off" />)
                                            ) : (
                                                <span className="ant-form-text">{data && data.right12}</span>
                                            )}
                                        </Form.Item>
                                        <span className="name">近</span>
                                        <Form.Item>
                                            {edit ? (
                                                getFieldDecorator("right13", {
                                                    initialValue: data && data.right13
                                                })(<Input autoComplete="off" />)
                                            ) : (
                                                <span className="ant-form-text">{data && data.right13}</span>
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {edit ? (
                            <div className="btn-group">
                                <Button type="primary" onClick={this.handleSubmit}>
                                    {data ? "修改" : "保存"}
                                </Button>
                                <Button onClick={e => this.setState({ edit: false, data: this.data })} style={{ marginLeft: 10 }}>
                                    返回
                                </Button>
                            </div>
                        ) : (
                            <div className="btn-group">
                                <Button onClick={e => this.setState({ edit: true })} type="primary">
                                    编辑
                                </Button>
                            </div>
                        )}
                    </Form>
                ) : (
                    <div className="tab-page">
                        <div className="btn-group">
                            <Button type="primary" onClick={e => this.setState({ data: {}, edit: true })}>
                                添加特检报告
                            </Button>
                        </div>
                    </div>
                );
            }
        }
    )
);
