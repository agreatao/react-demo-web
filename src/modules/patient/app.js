import "./style";

import React from "react";
import entry from "utils/entry";
import Master from "commons/master";
import PatientContent from "./content";
import PatientDetail from "./detail";

class PatientPage extends React.Component {
    state = {
        detail: null
    }
    showDetail = (detail) => {
        this.setState({ detail })
    }
    hideDetail = () => {
        this.setState({ detail: null })
    }
    render() {
        const { detail } = this.state;
        return (
            <Master>
                <PatientContent onRowSelect={this.showDetail} />
                {
                    detail && <PatientDetail data={detail} onClose={this.hideDetail} />
                }
            </Master>
        );
    }
}

entry(<PatientPage />);
