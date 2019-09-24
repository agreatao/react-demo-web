import { Icon } from "antd";
import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { barsResize, toggleFilter } from "store/actions/bars";
import "./style";

export default connect(
    state => ({ bars: state.bars }),
    dispatch => bindActionCreators({ barsResize, toggleFilter }, dispatch)
)(
    class Bars extends React.Component {
        constructor(props) {
            super(props);
            this.filter = React.createRef();
        }
        shouldComponentUpdate(nextProps) {
            return this.props.bars.visible != nextProps.bars.visible;
        }
        componentDidUpdate() {
            const { children, barsResize } = this.props;
            const { visible } = this.props.bars;
            barsResize({
                height: visible && children ? 50 + this.filter.current.offsetHeight : 50
            });
        }
        toggleFilter = e => {
            e.preventDefault();
            this.props.toggleFilter();
        };
        render() {
            const { left, right, children } = this.props;
            const { visible } = this.props.bars;
            return (
                <div className="bars">
                    <div className="bars-inner">
                        <div className="bars-left">{left}</div>
                        <div className="bars-right">
                            {right}
                            {children && (
                                <a onClick={this.toggleFilter} className={classnames("filter-btn", { active: visible })}>
                                    <Icon type="filter" theme="filled" />
                                </a>
                            )}
                        </div>
                    </div>
                    {children && visible && (
                        <div ref={this.filter} className="bars-filter">
                            {children}
                        </div>
                    )}
                </div>
            );
        }
    }
);
