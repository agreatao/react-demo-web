import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

export default connect(state => ({ browser: state.browser }))(
    class Sidebar extends React.Component {
        render() {
            const { height } = this.props.browser;
            return <div className="sidebar" style={{ height: height - 50 }}>
                {CONFIG.nav.map((item, index) => <a className={classnames({
                    active: window.location.href.indexOf(item.to) > -1
                })} href={window.location.href.indexOf(item.to) > -1 ? "javascript:void(0)" : (CONFIG.baseURL + item.to)} key={index}>{item.title}</a>)}
            </div>;
        }
    }
);
