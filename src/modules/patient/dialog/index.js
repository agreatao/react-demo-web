import React from "react";
import { dialog } from "components/alert";
import http from "utils/http";

class Detail extends React.Component {
    componentDidMount() {
        const { data } = this.props;
        http.post("/sick/querySickInfo", data).then(result => {
            console.log(result);
        })
        http.get("/sick/querySickHistory", { sickInfoId: data.sickId }).then(result => {
            console.log(result);
        })
        http.get("/sick/querySickNormalCheck", { sickInfoId: data.sickId }).then(result => {
            console.log(result);
        })
        http.get("/sick/querySickSpecialCheck", { sickInfoId: data.sickId }).then(result => {
            console.log(result);
        })
    }
    render() {
        return <div>

        </div>
    }
}

export const viewDetail = data => {
    dialog(<Detail data={data} />, { width: 989 });
}