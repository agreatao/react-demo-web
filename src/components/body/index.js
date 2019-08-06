import classnames from 'classnames';
import React from 'react';
import './style';

class Body extends React.Component {
    render() {
        const { className, left, leftWidth, right, rightWidth, height, border } = this.props;
        return (
            <div className={classnames("body-container", {
                'border': border
            })} style={{ height: height }}>
                {
                    left &&
                    <div className="body-left" style={{ width: leftWidth }}>
                        <div className="body-inner" style={{ height: height - (border ? 16 : 0) }}>
                            {left}
                        </div>
                    </div>
                }
                <div className={classnames('body-center', className)}>
                    <div style={{ height: height - (border ? 16 : 0) }}>
                        {this.props.children}
                    </div>
                </div>
                {
                    right &&
                    <div className="body-right" style={{ width: rightWidth }}>
                        <div className="body-inner" style={{ height: height - (border ? 16 : 0) }}>
                            {right}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

Body.defaultProps = {
    leftWidth: 0,
    rightWidth: 0,
    height: 0,
    border: false
}

export default Body;