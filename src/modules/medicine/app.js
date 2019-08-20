import Master from "commons/master";
import React from "react";
import entry from "utils/entry";
import Content from "./content";
import "./style";

class Page extends React.Component {
    render() {
        return (
            <Master>
                <Content />
            </Master>
        );
    }
}

entry(<Page />);
