import { Input } from "antd";
import React from "react";
const { TextArea } = Input;

export default class CustomTextArea extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                value: nextProps.value
            }
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    handleChange = e => {
        e.preventDefault();
        this.props.onChange && this.props.onChange(e.target.value);
    }
    render() {
        const { max } = this.props;
        const { value } = this.state;
        return <div className="c-text-area">
            <TextArea
                rows={3}
                style={{ resize: "none" }}
                value={value}
                onChange={this.handleChange}
            />
            {max != null && <span className="c-text-area-length">{max - (value && value.length || 0)}</span>}
        </div>
    }
}