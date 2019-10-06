import React from "react";
import { Form, Input, Icon } from "antd";

const emptyObj = {
    left1: null,
    left2: null,
    left3: null,
    left4: null,
    left5: null,
    right1: null,
    right2: null,
    right3: null,
    right4: null,
    right5: null
}

export default class SickCheckItems extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                value: [...nextProps.value] || [{ ...emptyObj }]
            }
        }
        return {
            value: [{ ...emptyObj }]
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            value: [...props.value] || [{ ...emptyObj }]
        };
    }
    handleAdd = () => {
        const { value } = this.state;
        value.push({ ...emptyObj });
        this.props.onChange && this.props.onChange(value);
    }
    handleRemove = (index) => {
        const { value } = this.state;
        value.splice(index, 1);
        this.props.onChange && this.props.onChange(value);
    }
    handleInputChange = (index, name, ev) => {
        const { value } = this.state;
        value[index][name] = ev;
        this.props.onChange && this.props.onChange(value);
    }
    render() {
        const { value } = this.state;
        return <React.Fragment>
            <div className="check-info-left">
                {value.map((item, index) => <React.Fragment key={index}>
                    <div>
                        <Form.Item>
                            <Input autoComplete="off" value={item.left1} onChange={e => this.handleInputChange(index, "left1", e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Input autoComplete="off" value={item.left2} onChange={e => this.handleInputChange(index, "left2", e.target.value)} />
                        </Form.Item>
                        <span className="check-info-span">X</span>
                        <Form.Item>
                            <Input autoComplete="off" value={item.left3} onChange={e => this.handleInputChange(index, "left3", e.target.value)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="远">
                            <Input autoComplete="off" value={item.left4} onChange={e => this.handleInputChange(index, "left4", e.target.value)} />
                        </Form.Item>
                        <Form.Item label="近">
                            <Input autoComplete="off" value={item.left5} onChange={e => this.handleInputChange(index, "left5", e.target.value)} />
                        </Form.Item>
                    </div>
                </React.Fragment>)}
            </div>
            <label className="check-info-label">主觉验光</label>
            <div className="check-info-right">
                {value.map((item, index) => <React.Fragment key={index}>
                    <div>
                        <Form.Item>
                            <Input autoComplete="off" value={item.right1} onChange={e => this.handleInputChange(index, "right1", e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Input autoComplete="off" value={item.right2} onChange={e => this.handleInputChange(index, "right2", e.target.value)} />
                        </Form.Item>
                        <span className="check-info-span">X</span>
                        <Form.Item>
                            <Input autoComplete="off" value={item.right3} onChange={e => this.handleInputChange(index, "right3", e.target.value)} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="远">
                            <Input autoComplete="off" value={item.right4} onChange={e => this.handleInputChange(index, "right4", e.target.value)} />
                        </Form.Item>
                        <Form.Item label="近">
                            <Input autoComplete="off" value={item.right5} onChange={e => this.handleInputChange(index, "right5", e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            {
                                index === 0 ?
                                    value.length < 5 && <Icon type="plus-circle" onClick={this.handleAdd} />
                                    :
                                    <Icon type="minus-circle" onClick={() => this.handleRemove(index)} />
                            }
                        </Form.Item>
                    </div>
                </React.Fragment>)}
            </div>
        </React.Fragment>
    }
}