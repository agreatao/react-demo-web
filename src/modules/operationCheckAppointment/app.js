import "./style";

import React from "react";
import entry from "utils/entry";
import Master from "commons/master";
import AppointmentTable from "./table";

class OperationCheckAppointmentPage extends React.Component {
    render() {
        return (
            <Master>
                <AppointmentTable />
            </Master>
        );
    }
}

entry(<OperationCheckAppointmentPage />);
