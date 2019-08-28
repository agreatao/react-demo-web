import React from "react";

export const columns = ({ onCall, onCancel, onUpdate }) => {
    return [
        { title: "姓名", dataIndex: "name" },
        { title: "电话号码", dataIndex: "phone" },
        { title: "预约时间", dataIndex: "appointDate", render: () => "2019-10-20 下午（1:00 - 5:00）" },
        { title: "预约医生", dataIndex: "doctorName" },
        {
            title: "操作",
            className: "actions",
            dataIndex: "id",
            render: (id, row, index) => (
                <React.Fragment>
                    <a onClick={e => onCall && onCall(row, e)}>叫号</a>
                    <a onClick={e => onUpdate && onUpdate(row, e)}>修改预约</a>
                    <a onClick={e => onCancel && onCancel(row, e)}>取消预约</a>
                </React.Fragment>
            )
        }
    ];
};
