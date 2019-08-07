import "./style";

import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Icon } from "antd";

class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    toggleFilter(e) {
        e.preventDefault();
        this.setState(prev => ({
            visible: !prev.visible
        }))
    }
    shouldComponentUpdate(_nextProps, nextState) {
        return this.state.visible != nextState.visible;
    }
    componentDidUpdate() {
        const { children, barsResize } = this.props;
        const { visible } = this.state;
        barsResize({
            height: visible && children ? 50 + this.refs.filter.offsetHeight : 50
        })
    }
    render() {
        const { left, right, children } = this.props;
        const { visible } = this.state;
        return (
            <div className="bars">
                <div className="bars-inner">
                    <div className="bars-left">{left}</div>
                    <div className="bars-right">
                        {right}
                        {children && (
                            <a onClick={e => this.toggleFilter(e)} className={classnames("filter-btn", { active: visible })}><Icon type="filter" theme="filled" /></a>
                        )}
                    </div>
                </div>
                {children && visible && <div ref="filter" className="bars-filter">{children}</div>}
            </div>
        );
    }
}

import { barsResize } from "store/actions/bars";

export default connect(
    null,
    dispatch => ({
        barsResize: (payload) => dispatch(barsResize(payload))
    })
)(Bars);
