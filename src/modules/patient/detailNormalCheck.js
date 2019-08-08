import React from "react";
import { connect } from "react-redux";

export default connect(
    state => ({ browser: state.browser })
)(class extends React.Component {
    render() {
        const { height } = this.props.browser;
        return <div className="tab-page normal-check" style={{ height: height - 166 }}>
            <div className="base-info-item">
                <label>检查时间</label>
                <span>2019-10-20 20:00:00</span>
            </div>
            <hr />
            <div className="icon">
                <div className="left"></div>
                <div className="right"></div>
            </div>
            <div className="normal-check-item">
                <div className="left">远<span></span>近<span></span></div>
                <label>裸眼视力</label>
                <div className="right">远<span></span>近<span></span></div>
            </div>
            <div className="normal-check-item">
                <div className="left"></div>
                <label>电脑验光</label>
                <div className="right"></div>
            </div>
            <div className="normal-check-item">
                <div className="left">mm</div>
                <label>瞳孔直径</label>
                <div className="right">mm</div>
            </div>
            <div className="normal-check-item">
                <div className="left">mmHg</div>
                <label>眼压</label>
                <div className="right">mmHg</div>
            </div>
            <div className="normal-check-item">
                <div className="left">mm</div>
                <label>眼轴长度</label>
                <div className="right">mm</div>
            </div>
            <div className="normal-check-item main-eye">
                <div className="left"><span className="active">OD</span></div>
                <label>主视眼</label>
                <div className="right"><span>OS</span></div>
            </div>
            <div className="normal-check-item">
                <div className="left"></div>
                <label>主觉验光</label>
                <div className="right"></div>
            </div>
        </div>
    }
});