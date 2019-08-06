import "./style";

import React from "react";
import classnames from "classnames";

class Bars extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { left, right, children } = this.props;
        return (
            <div className="bars">
                <div className="bars-container">
                    <div className="bars-left">{left}</div>
                    <div className="bars-right">
                        {right}
                        {children && (
                            <a className={classnames("filter-btn")}>筛选</a>
                        )}
                    </div>
                </div>
                {children && <div className="filter-form">{children}</div>}
            </div>
        );
    }
}

export default Bars;
