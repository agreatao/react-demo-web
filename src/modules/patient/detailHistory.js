import React from "react";
import { connect } from "react-redux";

export default connect(
    state => ({ browser: state.browser })
)(class extends React.Component {
    render() {
        const { height } = this.props.browser;
        return <div className="tab-page history" style={{ height: height - 166 }}>
            <div className="base-info-item">
                <label>视力减退</label>
                <span>1年</span>
            </div>
            <div className="base-info-subitem">
                <label>眼镜</label>
                <span>带框眼镜</span>
                <label>戴镜</label>
                <span>20年</span>
                <label>脱镜</label>
                <span>1年半</span>
            </div>
            <hr />
            <div className="base-info-item" style={{ marginBottom: 15 }}>
                <label>基本稳定</label>
                <span>1年</span>
            </div>
            <div className="icon">
                <div className="left"></div>
                <div className="right"></div>
            </div>
            <div className="normal-check-item">
                <div className="left"><span></span><span></span>/<span></span></div>
                <label>眼睛度数</label>
                <div className="right"><span></span><span></span>/<span></span></div>
            </div>
            <hr />
            <div className="base-info-item">
                <label>严重干眼病史</label>
                <span>否</span>
            </div>
            <div className="base-info-item">
                <label>角膜炎病史</label>
                <span>否</span>
            </div>
            <div className="base-info-item">
                <label>家族病史</label>
                <span>父亲</span>
            </div>
            <hr />
            <div className="base-info-item">
                <label>全身疾病史</label>
                <span></span>
            </div>
            <div className="base-info-item">
                <label>精神性病史</label>
                <span></span>
            </div>
            <div className="base-info-item">
                <label>手术史</label>
                <span></span>
            </div>
            <div className="base-info-item">
                <label>其他</label>
                <span></span>
            </div>
        </div>
    }
})