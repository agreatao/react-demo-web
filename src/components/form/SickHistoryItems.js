import React from "react";
import { Form, Input, Icon, Select } from "antd";

const { Option } = Select;

const emptyObj = {
    glassesType: null,
    glassesYear: null,
    tjYear: null
}

const GLASS_TYPES = [
    { value: "框架眼镜", text: "框架眼镜" },
    { value: "软片隐形眼镜", text: "软片隐形眼镜" },
    { value: "RGP", text: "RGP" },
];

export default class SickHistoryItems extends React.Component {
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
        return <div className="sick-history-items">
            {value.map((item, index) => <div key={index}>
                <Form.Item colon={false} label="戴何种眼镜">
                    <Select value={item.glassesType} onChange={_value => this.handleInputChange(index, 'glassesType', _value)}>
                        {GLASS_TYPES.map(type => <Option value={type.value} key={type.value}>{type.text}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item colon={false} className="label-sm" label="戴镜">
                    <Input autoComplete="off" value={item.glassesYear} onChange={e => this.handleInputChange(index, 'glassesYear', e.target.value)} />
                </Form.Item>
                <Form.Item colon={false} className="label-sm" label="脱镜">
                    <Input autoComplete="off" value={item.tjYear} onChange={e => this.handleInputChange(index, 'tjYear', e.target.value)} />
                </Form.Item>
                <Form.Item>
                    {
                        index === 0 ?
                            value.length < 5 && <Icon type="plus-circle" onClick={this.handleAdd} />
                            :
                            <Icon type="minus-circle" onClick={() => this.handleRemove(index)} />
                    }
                </Form.Item>
            </div>)}
        </div>
    }
}