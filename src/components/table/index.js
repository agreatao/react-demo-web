import React from "react";
import { Table, Modal, Button, Pagination } from "antd";
import "./index.less";

function XTable(props) {
    const { onEdit, onDelete, operations, onPageChange, list, total, columns, currentPage, pageSize } = props;
    const tableProps = Object.assign({}, props, {
        onDelete: undefined,
        onEdit: undefined,
        operations: undefined,
        columns: undefined,
        onPageChange: undefined,
        list: undefined,
        total: undefined
    });

    const _columns = (columns || []).concat([{
        title: "操作",
        width: operations && operations.width,
        className: "operation",
        dataIndex: tableProps.rowKey,
        render: (rowKey, row, index) => <React.Fragment>
            {operations && operations.others && operations.others(rowKey, row, index)}
            {onEdit && <a onClick={() => onEdit(row)}>编辑</a>}
            {onDelete && <a onClick={() => handleDelete(rowKey)}>删除</a>}
        </React.Fragment>
    }]);

    function handleDelete(rowKey) {
        Modal.confirm({
            title: "确定要删除吗？",
            centered: true,
            okText: "删除",
            cancelText: "取消",
            onOk: () => onDelete(rowKey)
        })
    }

    return <React.Fragment>
        <Table
            className="x-table"
            {...tableProps}
            dataSource={list}
            size="small"
            pagination={false}
            columns={_columns}
        />
        {onPageChange &&
            <Pagination
                className="x-table-pagination"
                showQuickJumper={{
                    goButton: <Button size="small">跳转</Button>
                }}
                size="small"
                defaultCurrent={1}
                current={currentPage}
                pageSize={pageSize}
                defaultPageSize={10}
                total={total}
                showTotal={(total) => `共 ${total} 条`}
                onChange={onPageChange}
            />}
    </React.Fragment>
}

XTable.defaultProps = {
    rowKey: "id"
}

export default XTable;