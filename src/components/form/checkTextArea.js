import { Radio } from "antd";
import React from "react";
import CTextArea from "./textArea";

export default class CheckTextArea extends React.Component {
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
    handleRadioChange = e => {
        const { value } = this.state;
        value[0] = e.target.value;
        this.props.onChange && this.props.onChange(value);
    };
    handleTextChange = e => {
        const { value } = this.state;
        value[1] = e.target.value;
        this.props.onChange && this.props.onChange(value);
    };
    render() {
        const { max, rows, disabled } = this.props;
        const { value } = this.state;
        return <div>
            <Radio.Group
                value={value[0]}
                disabled={disabled}
                onChange={this.handleRadioChange}>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
            </Radio.Group>
            <CTextArea
                rows={rows}
                disabled={disabled || value[0] === 0}
                max={max}
                value={value[1]}
                onChange={this.handleTextChange}
            />
        </div>
    }
}