import classnames from 'classnames';
import React from 'react';
import './style';

class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.filterVisible
        }
    }
    render() {
        const { visible } = this.state;
        const { left, right, children } = this.props;
        return (
            <div className="bars">
                <div className="bars-container">
                    {
                        left &&
                        <div className="bars-left">
                            <div className="bars-inner">
                                {left}
                            </div>
                        </div>
                    }
                    {
                        (right || children) &&
                        <div className="bars-right">
                            <div className="bars-inner">
                                {right}
                                {children && <a className={classnames("filter-btn", {
                                    "active": visible
                                })} onClick={() => {
                                    this.setState(prev => ({
                                        visible: !prev.visible
                                    }))
                                }}>筛选</a>}
                            </div>
                        </div>
                    }
                </div>
                {
                    children && filterVisible &&
                    <div className="filter-form">{children}</div>
                }
            </div>
        )
    }
}

Bars.defaultProps = {
    filterVisible: false
}

export default Bars;