import "./style";

import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Sidebar from "./sidebar";

export default connect(state => ({ browser: state.browser }))(
    class extends React.Component {
        render() {
            const { height } = this.props.browser;
            return (
                <React.Fragment>
                    <Header />
                    <Sidebar />
                    <section
                        className="page-view"
                        style={{ height: height - 50 }}
                    >
                        {this.props.children}
                    </section>
                </React.Fragment>
            );
        }
    }
);
