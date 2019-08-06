import React from "react";
import entry from "utils/entry";
import Master from "commons/master";
import Table from "./table";

class App extends React.Component {
    render() {
        return (
            <Master>
                <Table />
            </Master>
        );
    }
}

entry(<App />);
