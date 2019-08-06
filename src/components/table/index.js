import { Table } from "antd";
import React from "react";
import "./style.less";

import emptyTableIcon from "images/table/empty-table.png";

class CTable extends React.Component {
    render() {
        const { emptyText, emptyIcon, style } = this.props;
        let height = null;
        if (style && style.height) height = style.height - 53.6;
        return (
            <Table
                {...this.props}
                pagination={false}
                locale={{
                    emptyText: <EmptyTable text={emptyText} height={height} icon={emptyIcon} />
                }}
            />
        );
    }
}

CTable.defaultProps = {
    emptyText: "暂无数据",
    emptyIcon: emptyTableIcon
};

export default CTable;

const EmptyTable = ({ text, icon, height }) => (
    <div className="empty-table" style={{ height: height }}>
        {icon && <img src={icon} style={{ marginTop: height != null && (height - 281) / 2 }} />}
        <div className="empty-text">{text}</div>
    </div>
);
