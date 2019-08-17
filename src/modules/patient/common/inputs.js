import React from "react"
import { Input } from 'antd';

class Inputs extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            const [degree1, degree2, degree3] = nextProps.value || [null, null, null];
            return {
                degree1,
                degree2,
                degree3
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || [null, null, null];
        this.state = {
            degree1: value[0],
            degree2: value[1],
            degree3: value[2]
        };
    }

    handleInputChange = (index, e) => {
        let value = e.target.value;
        const { onChange } = this.props;
        if (onChange) {
            const { degree1, degree2, degree3 } = this.state;
            onChange([index == 1 ? value : degree1, index == 2 ? value : degree2, index == 3 ? value : degree3]);
        }
    };

    render() {
        const { size } = this.props;
        const { state } = this;
        return (
            <div className="inputs">
                <Input
                    autoComplete="off"
                    type="text"
                    size={size}
                    value={state.degree1}
                    onChange={e => this.handleInputChange(1, e)}
                />
                <Input
                    autoComplete="off"
                    type="text"
                    size={size}
                    value={state.degree2}
                    onChange={e => this.handleInputChange(2, e)}
                />
                <span>/</span>
                <Input
                    autoComplete="off"
                    type="text"
                    size={size}
                    value={state.degree3}
                    onChange={e => this.handleInputChange(3, e)}
                />
            </div>
        );
    }
}

export default Inputs;