import React from "react";
import { connect } from "react-redux";

export default connect(state => ({ browser: state.browser }))(
    class Sidebar extends React.Component {
        render() {
            const { height } = this.props.browser;
            return <div className="sidebar" style={{ height: height - 50 }}>
                {CONFIG.nav.map((item, index) => <a href={CONFIG.baseURL + item.to} key={index}>{item.title}</a>)}
            </div>;
        }
    }
);
