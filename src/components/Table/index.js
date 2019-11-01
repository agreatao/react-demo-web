import { Modal, Table } from "antd";
import Pagination from "components/Pagination";
import React from "react";
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
        total: undefined,
        currentPage: undefined,
        pageSize: undefined
    });

    const _columns = (columns || []).concat((onEdit || onDelete || operations) ? [{
        title: "操作",
        width: operations && typeof operations !== 'function' && operations.width,
        className: "operation",
        dataIndex: tableProps.rowKey,
        render: (rowKey, row, index) => <React.Fragment>
            {operations && (typeof operations === 'function' ? operations(rowKey, row, index) : typeof operations.render === 'function' && operations.render(rowKey, row, index))}
            {onEdit && <a onClick={() => onEdit(row)}>编辑</a>}
            {onDelete && <a onClick={() => handleDelete(rowKey)}>删除</a>}
        </React.Fragment>
    }] : []);

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
        {onPageChange && <Pagination {...{ currentPage, pageSize, total, onPageChange, }} />}
    </React.Fragment>
}

XTable.defaultProps = {
    rowKey: "id",
    currentPage: 1,
    pageSize: 10
}

export default XTable;