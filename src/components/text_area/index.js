import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

class CTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }
    render() {
        const { max } = this.props;
        const { value } = this.state;
        return (
            <div style={{ position: "relative" }}>
                <TextArea
                    rows={3}
                    style={{ resize: "none" }}
                    value={value}
                    // onPressEnter={e => console.log(e)}
                    onChange={e => {
                        this.setState({ value: e.target.value });
                        this.props.onChange && this.props.onChange(e.target.value);
                    }}
                />
                {max != null && (
                    <span style={{ position: "absolute", right: 8, bottom: 8, color: "#ccc", lineHeight: "normal" }}>
                        {max - ((value && value.length) || 0)}
                    </span>
                )}
            </div>
        );
    }
}

export default CTextArea;
