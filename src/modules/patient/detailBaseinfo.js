import React from "react";
import { connect } from "react-redux";

export default connect(
    state => ({ browser: state.browser })
)(class extends React.Component {
    render() {
        const { height } = this.props.browser;
        return <div className="tab-page base-info" style={{ height: height - 166 }}>
            <div className="base-info-item">
                <label>病历号</label>
                <span>23241411</span>
            </div>
            <div className="base-info-item">
                <label>姓名</label>
                <span>你好</span>
            </div>
            <div className="base-info-item">
                <label>姓名拼音</label>
                <span>NiHao</span>
            </div>
            <div className="base-info-item">
                <label>性别</label>
                <span>男</span>
            </div>
            <div className="base-info-item">
                <label>出生年月</label>
                <span>2019-10-20</span>
            </div>
            <div className="base-info-item">
                <label>年龄</label>
                <span>21</span>
            </div>
            <div className="base-info-item">
                <label>身份证</label>
                <span>324412412421415</span>
            </div>
            <div className="base-info-item">
                <label>职业</label>
                <span>学生</span>
            </div>
            <div className="base-info-item">
                <label>联系方式</label>
                <span>12331415120</span>
            </div>
            <div className="base-info-item">
                <label>地址</label>
                <span>浙江省杭州市滨江区西兴街道绿地旭辉城9幢23号3201室</span>
            </div>
        </div>
    }
})