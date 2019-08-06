import React from "react";
import classnames from "classnames";
import moment from "moment";
import "./style.less";

class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment(props.time || new Date()).format(props.pattern)
        };
    }
    componentDidMount() {
        const { time, pattern, rate, isReal } = this.props;
        let target = moment(time || new Date());
        this.hasReal(target, pattern, rate, isReal);
    }
    hasReal(target, pattern, rate, isReal) {
        this.setState({ value: target.format(pattern) }, () => {
            if (isReal) {
                let timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    target.add(rate / 1000, "seconds");
                    this.hasReal(target, pattern, rate, isReal);
                }, rate);
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        const { isReal, rate, pattern } = nextProps;
        if (isReal != this.props.isReal || rate != this.props.rate || pattern != this.props.pattern) {
            this.hasReal(moment(this.state.value, pattern), pattern, rate, isReal);
        }
    }
    shouldComponentUpdate(_nextProps, nextState) {
        return nextState.value !== this.state.value;
    }
    render() {
        const { className } = this.props;
        const { value } = this.state;
        return <div className={classnames("time", className)}>{value}</div>;
    }
}

Time.defaultProps = {
    rate: 1000,
    pattern: "YYYY-MM-DD HH:mm:ss",
    isReal: true
};

export default Time;
