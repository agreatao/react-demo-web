import "./style";

import React from "react";
import entry from "utils/entry";
import Master from "commons/master";
import MedicineContent from "./content";

class MedicinePage extends React.Component {
    render() {
        return (
            <Master>
                <MedicineContent />
            </Master>
        );
    }
}

entry(<MedicinePage />);
