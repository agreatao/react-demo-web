import React from "react";
import Login from "../components/Login";

function Index() {
    return <div className="login">
        <div className="login-bg">
            <div className="login-intro">
                <h4>明世康眼科医院</h4>
                <p>这是是一段医院标语，可以自定，可以多行...</p>
                <p>建议两到三行未最佳</p>
            </div>
            <Login />
        </div>
    </div>
}

export default Index;