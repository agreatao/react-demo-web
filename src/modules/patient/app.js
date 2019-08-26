import "./style";

import React from "react";
import entry from "utils/entry";
import Master from "commons/master";
import Content from "./content";
import Detail from "./detail";

class Page extends React.Component {
    state = {
        detail: null
    };
    showDetail = detail => {
        this.setState({ detail });
    };
    hideDetail = () => {
        this.setState({ detail: null });
    };
    render() {
        const { detail } = this.state;
        return (
            <Master activePage="patient">
                <div style={{ display: "flex" }}>
                    <Content onRowSelect={this.showDetail} />
                    {detail && <Detail data={detail} onClose={this.hideDetail} />}
                </div>
            </Master>
        );
    }
}

entry(<Page />);
