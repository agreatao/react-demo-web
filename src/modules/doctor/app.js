import Master from "commons/master";
import React from "react";
import entry from "utils/entry";
import Content from "./content";

class Page extends React.Component {
    render() {
        return (
            <Master activePage="doctor">
                <Content />
            </Master>
        );
    }
}

entry(<Page />);
