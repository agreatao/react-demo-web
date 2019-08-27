import React from "react";

export const columns = ({  onCancel, onUpdate }) => {
    return [
        { title: "病历号", dataIndex: "sickId" },
        { title: "姓名", dataIndex: "name" },
        { title: "电话号码", dataIndex: "phone" },
        { title: "预约时间", dataIndex: "appointTime" },
        { title: "检查项目", dataIndex: "checkProject" },
        {
            title: "操作",
            className: "actions",
            dataIndex: "id",
            render: (id, row, index) => (
                <React.Fragment>
                    <a onClick={e => onUpdate && onUpdate(row, e)}>修改预约</a>
                    <a onClick={e => onCancel && onCancel(row, e)}>取消预约</a>
                </React.Fragment>
            )
        }
    ];
};
