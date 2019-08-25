import React from "react";
import ReactDOM from "react-dom";
import Cookie from "js-cookie";
import http from "utils/http";

export default class Header extends React.Component {
    logout = (e) => {
        e.preventDefault();
        http.get("/login/loginOut")
            .then(() => {
                window.location.href = CONFIG.baseURL + "/login";
                Cookie.remove("token");
                Cookie.remove("nickName");
            })
    }
    render() {
        return ReactDOM.createPortal(
            <header className="top-header">
                <div className="top-header-left">

                </div>
                <div className="top-header-right">
                    <a>编辑</a>
                    <a onClick={this.logout}>退出</a>
                </div>
            </header>,
            document.body
        );
    }
}
