import { Radio } from "antd";
import React from "react";
import CTextArea from "./textArea";

export default class CustomCheckTextArea extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            let radioValue, textAreaValue;
            const { value } = nextProps;
            if (value == null || value === "否") {
                radioValue = 0;
            } else if (value === "是") {
                radioValue = 1;
                textAreaValue = "";
            } else if (value != "") {
                radioValue = 1;
                textAreaValue = value;
            }
            return {
                radioValue,
                textAreaValue
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        let radioValue, textAreaValue;
        const { value } = props;
        if (value == null || value === "否") {
            radioValue = 0;
        } else if (value === "是") {
            radioValue = 1;
            textAreaValue = "";
        } else if (value != "") {
            radioValue = 1;
            textAreaValue = value;
        }
        this.state = {
            radioValue,
            textAreaValue
        };
    }
    handleRadioChange = e => {
        this.props.onChange &&
            this.props.onChange(e.target.value === 1 ? "是" : "否");
    };
    handleTextChange = e => {
        this.props.onChange && this.props.onChange(e.target.value);
    };
    render() {
        const { max } = this.props;
        const { radioValue, textAreaValue } = this.state;
        return <React.Fragment>
            <Radio.Group
                value={radioValue}
                onChange={this.handleRadioChange}>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
            </Radio.Group>
            {radioValue == 1 && <CTextArea
                max={max}
                value={textAreaValue}
                onChange={this.handleTextChange}
            />}
        </React.Fragment>
    }
}