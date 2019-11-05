import { Button, Pagination, Input, Select } from "antd";
import React, { useState } from "react";
import "./index.less";

const { Option } = Select;

function XPagination({ total, currentPage, pageSize, onPageChange }) {

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
        if (jumpPage != null)
            onPageChange(jumpPage, pageSize);
        setJumpPage(null);
    }

    function handlePageSizeChange(_pageSize) {
        onPageChange(currentPage, _pageSize);
    }

    return <div className="x-pagination">
        <div className="x-pagination-left">
            <div className="x-pagination-total">共<span>{total}</span>条</div>
            <Select value={pageSize} className="x-pagination-size-change" size="small" onChange={handlePageSizeChange}>
                <Option value={10}>10条/页</Option>
                <Option value={20}>20条/页</Option>
                <Option value={30}>30条/页</Option>
                <Option value={40}>40条/页</Option>
            </Select>
        </div>
        {total > 0 && <div className="x-pagination-right">
            <Pagination
                size="small"
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={onPageChange}
            />
            <Input disabled={total === 0} size="small" className="x-pagination-jump-input" value={jumpPage} onChange={handleJumpInputChange} />
            <Button disabled={total === 0} size="small" className="x-pagination-jump-btn" onClick={hangleJumpToPage}>跳转</Button>
        </div>}
    </div>
}

export default XPagination;