import React from "react";
import { connect } from "react-redux";
import http from "utils/http";
import Table from "components/table";
import Bars from "components/bars";

export default connect(state => ({ browser: state.browser }))(
    class extends React.Component {
        state = {
            tableData: null
        };
        loadData(sickId) {
            http.get("/opt/queryOptProgress", { params: { sickId } })
                .then(data => {})
                .catch(e => {});
        }
        componentDidMount() {
            if (this.props.dataKey) this.loadData(this.props.dataKey);
        }
        componentWillReceiveProps(nextProps) {
            if (!nextProps.dataKey) {
                this.data = null;
                this.setState({ data: null, edit: false });
            } else if (nextProps.dataKey != this.props.dataKey) this.loadData(nextProps.dataKey);
        }
        render() {
            const { height } = this.props.browser;
            const { tableData } = this.state;
            return (
                <React.Fragment>
                    <Bars left={<a>新增</a>} />
                    <Table style={{ height: height - 270 }} columns={[{ title: "手术时间", dataIndex: "optTime" }, { title: "主治医生", dataIndex: "doctor" }]} dataSource={tableData} />;
                </React.Fragment>
            );
        }
    }
);
