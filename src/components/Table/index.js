import React, { useState } from "react";
import { Table, Modal, Button, Pagination, Input } from "antd";
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

    const _columns = (columns || []).concat([{
        title: "操作",
        width: operations && typeof operations !== 'function' && operations.width,
        className: "operation",
        dataIndex: tableProps.rowKey,
        render: (rowKey, row, index) => <React.Fragment>
            {operations && (typeof operations === 'function' ? operations(rowKey, row, index) : typeof operations.render === 'function' && operations.render(rowKey, row, index))}
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

    const [jumpPage, setJumpPage] = useState(null);

    function handleJumpInputChange(e) {
        try {
            let page = parseInt(e.target.value);
            if (isNaN(page)) {
                throw "page is not number";
            }
            setJumpPage(Math.min(page, Math.ceil(total / pageSize)));
        } catch {
            setJumpPage(null);
        }
    }

    function hangleJumpToPage(e) {
        e.preventDefault();
        onPageChange(jumpPage, pageSize);
        setJumpPage(null);
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
            <div className="x-table-pagination">
                <div className="x-table-pagination-total">共<span>{total}</span>条</div>
                {total > 0 && <div className="x-table-pagination-control">
                    <Pagination
                        size="small"
                        current={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChange={onPageChange}
                    />
                    <Input disabled={total === 0} size="small" className="x-table-pagination-jump-input" value={jumpPage} onChange={handleJumpInputChange} />
                    <Button disabled={total === 0} size="small" className="x-table-pagination-jump-btn" onClick={hangleJumpToPage}>跳转</Button>
                </div>}
            </div>}
    </React.Fragment>
}

XTable.defaultProps = {
    rowKey: "id",
    currentPage: 1,
    pageSize: 10
}

export default XTable;