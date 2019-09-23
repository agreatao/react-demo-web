import React from "react";
import { Input } from "antd";

export default class Eye extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                value: nextProps.value
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    handleChange = (e, index) => {
        const { value } = this.state;
        value[index] = e.target.value;
        this.props.onChange && this.props.onChange(Object.assign([], value))
    }
    render() {
        const { value } = this.state;
        const { label, disabled } = this.props;
        return <div className="eye-input">
            {label && <label>{label}</label>}
            <Input autoComplete="off" value={value[0]} onChange={e => this.handleChange(e, 0)} {...{ disabled }} />
            <Input autoComplete="off" value={value[1]} onChange={e => this.handleChange(e, 1)}  {...{ disabled }} />
            <span>/</span>
            <Input autoComplete="off" value={value[2]} onChange={e => this.handleChange(e, 2)} {...{ disabled }} />
        </div>
    }
}