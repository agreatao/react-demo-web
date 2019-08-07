import { Table, Empty } from "antd";
import React from "react";
import "./style.less";

class CTable extends React.Component {
    render() {
        const { emptyText, style } = this.props;
        let height = null;
        if (style && style.height) height = style.height - 54;
        return (
            <Table
                {...this.props}
                pagination={false}
                locale={{
                    emptyText: <Empty className="empty-table" description={emptyText} style={{ height }} />
                }}
            />
        );
    }
}

CTable.defaultProps = {
    emptyText: "暂无数据"
};

export default CTable;
