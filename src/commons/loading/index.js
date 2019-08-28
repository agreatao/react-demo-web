import React from "react";
import "./style";

export default class Loading extends React.Component {
    static defaultProps = {
        height: 800
    };
    render() {
        const { height } = this.props;
        return (
            <div className="common-loading" style={{ height }}>
                <div className="loading">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
                <span>页面加载中...</span>
            </div>
        );
    }
}
