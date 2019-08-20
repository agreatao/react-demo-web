import { Icon } from "antd";
import classnames from "classnames";
import React from "react";
import { createPortal } from "react-dom";

class Close extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }
    render() {
        const { className } = this.props;
        const { hover } = this.state;
        return createPortal(
            <a
                onClick={this.props.onClick}
                onMouseOver={() => this.setState({ hover: true })}
                onMouseOut={() => this.setState({ hover: false })}
                className={classnames("modal-close-btn", className)}
            >
                <Icon type="close-circle" theme={hover ? "filled" : "outlined"} />
            </a>,
            document.body
        );
    }
}
export default Close;
