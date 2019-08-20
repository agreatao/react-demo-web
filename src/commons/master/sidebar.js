import React from "react";
import { connect } from "react-redux";

export default connect(state => ({ browser: state.browser }))(
    class Sidebar extends React.Component {
        render() {
            const { height } = this.props.browser;
            return <div className="sidebar" style={{ height: height - 50 }} />;
        }
    }
);
