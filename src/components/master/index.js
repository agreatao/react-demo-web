import "./style";

import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Sidebar from "./sidebar";

export default connect(state => ({ browser: state.browser }))(
    class extends React.Component {
        render() {
            const { height } = this.props.browser;
            const { activePage, activeSubmenu } = this.props;
            return (
                <React.Fragment>
                    <Header />
                    <Sidebar {...{ activePage, activeSubmenu }} />
                    <section className="page-container" style={{ height: height - 50 }}>
                        {this.props.children}
                    </section>
                </React.Fragment>
            );
        }
    }
);
