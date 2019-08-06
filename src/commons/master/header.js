import React from "react";
import ReactDOM from "react-dom";

export default class extends React.Component {
    render() {
        return ReactDOM.createPortal(
            <header className="top-header">
                <div className="top-header-left">
                    
                </div>
                <div className="top-header-right">
                    <a>编辑</a>
                    <a>退出</a>
                </div>
            </header>,
            document.body
        );
    }
}
