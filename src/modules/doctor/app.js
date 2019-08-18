import "./style";

import React from "react";
import entry from "utils/entry";
import Master from "commons/master";
import DoctorContent from "./content";

class DoctorPage extends React.Component {
    render() {
        return (
            <Master>
                <DoctorContent />
            </Master>
        );
    }
}

entry(<DoctorPage />);
