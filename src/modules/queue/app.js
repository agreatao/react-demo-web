import { Button } from "antd";
import Master from "components/master";
import Table from "components/table";
import React from "react";
import entry from "utils/entry";
import PatientCard from "./components/patientCard";
import "./style";

class Page extends React.Component {
    render() {
        return (
            <Master activePage="queue">
                <div className="queue-room">
                    <h2>科室五</h2>
                    <p>张君</p>
                </div>
                <div className="queue-container">
                    <div className="queue-inner">
                        <PatientCard />
                    </div>
                    <div className="queue-inner queue-controls">
                        <Button>病情记录</Button>
                        <Button>开方</Button>
                        <Button>手术预约</Button>
                        <Button>检查预约</Button>
                        <Button type="primary">下一位</Button>
                    </div>
                    <div className="queue-inner queue-list">
                        <div className="queue-title">挂号区</div>
                        <Table />
                        <div className="queue-title">预约区</div>
                        <Table />
                    </div>
                </div>
            </Master>
        );
    }
}

entry(<Page />);
