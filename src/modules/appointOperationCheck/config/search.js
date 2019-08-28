import React from "react";

export const columns = ({ onReAppoint }) => {
    return [
        { title: "病历号", dataIndex: "sickId" },
        { title: "姓名", dataIndex: "name" },
        { title: "电话号码", dataIndex: "phone" },
        { title: "预约时间", dataIndex: "appointTime" },
        { title: "检查项目", dataIndex: "checkProject" },
        { title: "状态", dataIndex: "status" },
        {
            title: "操作",
            className: "actions",
            dataIndex: "id",
            render: (id, row, index) => (
                <React.Fragment>
                    <a onClick={e => onReAppoint && onReAppoint(row, e)}>重新预约</a>
                </React.Fragment>
            )
        }
    ];
};
