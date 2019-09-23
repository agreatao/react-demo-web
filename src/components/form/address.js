import { Cascader } from "antd";
import React from "react";
import CTextArea from "./textArea";
import { provinces } from "lib/dic";

export default class Address extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            const { value } = nextProps;
            let [province, city, town, other] = [null, null, null, null];
            if (value) {
                [province, city, town, other] = value.split(" ");
                if (!city || !town || !other) {
                    other = value.replace(/\s+/g, "");
                    province = city = town = undefined;
                }
            }
            return {
                province, city, town, other
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        const { value } = props;
        let [province, city, town, other] = [null, null, null, null];
        if (value) {
            [province, city, town, other] = value.split(" ");
            if (!city || !town || !other) {
                other = value.replace(/\s+/g, "");
                province = city = town = undefined;
            }
        }
        this.state = {
            province, city, town, other
        };
    }
    handleCasChange = e => {
        const { other } = this.state;
        this.props.onChange && this.props.onChange(e.concat([other]).join(" "));
    }
    handleTextChange = e => {
        const { province, city, town } = this.state;
        this.props.onChange && this.props.onChange([province, city, town, e.target.value].join(" "));
    }
    render() {
        const { disabled } = this.props;
        const { province, city, town, other } = this.state;
        return <div>
            <Cascader options={provinces} value={[province, city, town]} {...{ disabled }} placeholder="" onChange={this.handleCasChange} />
            <CTextArea
                rows={2}
                value={other}
                {...{ disabled }}
                onChange={this.handleTextChange}
            />
        </div>
    }
}