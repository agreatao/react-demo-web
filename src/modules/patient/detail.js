import React from "react";
import { connect } from "react-redux";

import { Icon } from "antd";

export default connect()(class extends React.Component {
    render() {
        const { onClose } = this.props;
        return <div className="patient-detail">
            <header>
                <h4>患者详情</h4>
                <a className="close-btn" onClick={onClose}><Icon type="close" /></a>
            </header>
        </div>
    }
})