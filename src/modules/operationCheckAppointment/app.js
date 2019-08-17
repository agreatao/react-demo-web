import "./style";

import React from "react";
import entry from "utils/entry";
import Master from "commons/master";
import AppointmentContent from "./content";

class OperationCheckAppointmentPage extends React.Component {
    render() {
        return (
            <Master>
                <AppointmentContent />
            </Master>
        );
    }
}

entry(<OperationCheckAppointmentPage />);
