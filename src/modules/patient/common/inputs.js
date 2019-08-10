import React from "react";
import { Input } from "antd";

export default class extends React.Component {
    render() {
        return (
            <div className="inputs">
                <Input />
                <Input />
                <span>/</span>
                <Input />
            </div>
        );
    }
}
