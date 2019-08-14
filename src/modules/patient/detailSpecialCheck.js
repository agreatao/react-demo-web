import React from "react";
import { connect } from "react-redux";
import { Button, DatePicker, Form, Input, Radio, Select, Upload } from "antd";
import { Image } from "x-react-component";
import http from "utils/http";

const { Option } = Select;

import { specialReportType } from "lib/dic";

export default connect(state => ({ browser: state.browser }))(
    Form.create()(
        class extends React.Component {
            state = {
                edit: false,
                data: null,
                imageUrl: null
            };
            loadData(sickId) {
                http.get("/sick/querySickSpecialCheck", { params: { sickInfoId: sickId } }).then(data => {
                    this.data = data.result;
                    this.setState({ data: data.result, edit: false });
                }).catch(e => { });
            }
            componentDidMount() {
                if (this.props.dataKey)
                    this.loadData(this.props.dataKey);
            }
            componentWillReceiveProps(nextProps) {
                if (!nextProps.dataKey) {
                    this.data = null;
                    this.setState({ data: null, edit: false })
                } else if (nextProps.dataKey != this.props.dataKey)
                    this.loadData(nextProps.dataKey);
            }
            handleSubmit = e => {
                e.preventDefault();
                this.props.form.validateFields((err, values) => {
                    if (err) return;
                    if (this.data && this.data.id != null) values.id = this.data.id;
                    values.sickInfoId = this.props.dataKey;
                    http.post(this.data && this.data.id != null ? "/sick/updateSickSpecialCheck" : "/sick/addSickSpecialCheck").then(() => {
                        this.loadData(this.props.dataKey);
                    })
                })
            }
            handleCreate = e => {
                e.preventDefault();
                this.setState({ edit: true, data: {} });
            }
            render() {
                const { height } = this.props.browser;
                const { data, edit, imageUrl } = this.state;
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
                            {edit ? getFieldDecorator("reportType", {
                                initialValue: data && data.reportType
                            })(
                                <Select>
                                    {specialReportType.map(item => <Option value={item.value}>{item.text}</Option>)}
                                </Select>
                            ) : <span className="ant-form-text">{data && specialReportType.filter(item => item.value == data.reportType)[0] || ""}</span>}
                        </Form.Item>
                        <Form.Item {...layout} label="主治医生">
                            {edit ? getFieldDecorator("doctorId", {
                                initialValue: data && data.doctorId
                            })(
                                <Select></Select>
                            ) : <span className="ant-form-text">{data && data.doctorId}</span>}
                        </Form.Item>
                        <Form.Item {...layout} label="检查时间">
                            {edit ? getFieldDecorator("checkTime")(
                                <DatePicker
                                    showTime
                                    style={{ width: "100%" }}
                                />
                            )
                                : <span className="ant-form-text">2019-10-20</span>}
                        </Form.Item>
                        <Form.Item {...layout} label="检查设备">
                            {edit ? getFieldDecorator("device")(<Input />)
                                : <span className="ant-form-text">ICT</span>}
                        </Form.Item>
                        <Form.Item {...layout} label="检查眼睛">
                            {edit ? getFieldDecorator("eye")(
                                <Radio.Group>
                                    <Radio value={1}>左眼</Radio>
                                    <Radio value={2}>右眼</Radio>
                                </Radio.Group>
                            ) : <span className="ant-form-text">左眼</span>}
                        </Form.Item>
                        <Form.Item {...layout} label="医学影像">
                            {edit ? getFieldDecorator("image")(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={file => {
                                        const isJpgOrPng =
                                            file.type === "image/jpeg" ||
                                            file.type === "image/png";
                                        if (!isJpgOrPng) {
                                            message.error(
                                                "You can only upload JPG/PNG file!"
                                            );
                                        }
                                        const isLt2M =
                                            file.size / 1024 / 1024 < 2;
                                        if (!isLt2M) {
                                            message.error(
                                                "Image must smaller than 2MB!"
                                            );
                                        }
                                        return isJpgOrPng && isLt2M;
                                    }}
                                    onChange={info => {
                                        function getBase64(img, callback) {
                                            const reader = new FileReader();
                                            reader.addEventListener(
                                                "load",
                                                () =>
                                                    callback(reader.result)
                                            );
                                            reader.readAsDataURL(img);
                                        }
                                        if (
                                            info.file.status === "uploading"
                                        ) {
                                            this.setState({
                                                loading: true
                                            });
                                            return;
                                        }
                                        if (info.file.status === "done") {
                                            // Get this url from response in real world.
                                            getBase64(
                                                info.file.originFileObj,
                                                imageUrl =>
                                                    this.setState({
                                                        imageUrl,
                                                        loading: false
                                                    })
                                            );
                                        }
                                    }}
                                >
                                    <Image
                                        src={imageUrl}
                                        width={100}
                                        height={100}
                                    />
                                </Upload>
                            ) : <Image src={imageUrl} width={100} height={100} />}
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
                                    {edit ? getFieldDecorator("far")(<Input />)
                                        : <span className="ant-form-text">10.00</span>}
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
                                        this.setState({
                                            edit: false,
                                            data: null
                                        })
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
                                    onClick={e =>
                                        this.setState({ data: {}, edit: true })
                                    }
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
