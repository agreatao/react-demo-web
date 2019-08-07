import { Button, Input, Pagination } from "antd";
import React from "react";
import "./style";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: props.pageNo,
            jumpPageNo: props.pageNo,
            pageSize: props.pageSize,
            total: props.total
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                pageNo: nextProps.pageNo,
                pageSize: nextProps.pageSize,
                total: nextProps.total,
                jumpPageNo: nextProps.pageNo
            });
        }
    }
    onChange(pageNo) {
        const { pageSize } = this.state;
        this.props.onPageChange && this.props.onPageChange(pageNo, pageSize);
    }
    onJumpPageChange(e) {
        if (isNaN(parseInt(e.target.value, 10))) {
            this.setState(prev => ({
                jumpPageNo: prev.jumpPageNo
            }));
        } else {
            const { total, pageSize } = this.state;
            let jumpPageNo = Math.min(parseInt(e.target.value, 10), Math.ceil(total / pageSize));
            this.setState({
                jumpPageNo: Math.max(jumpPageNo, 1)
            });
        }
    }
    handleJumpPageChange() {
        const { jumpPageNo, pageSize } = this.state;
        this.props.onPageChange && this.props.onPageChange(jumpPageNo, pageSize);
    }
    render() {
        const { pageNo, jumpPageNo, pageSize, total } = this.state;
        return (
            <div className="page">
                <div className="page-left">
                    <span>共 {total} 条</span>
                </div>
                <div className="page-right">
                    {total > pageSize && (
                        <Pagination
                            current={pageNo}
                            pageSize={pageSize}
                            total={total}
                            onChange={pageNo => this.onChange(pageNo)}
                        />
                    )}
                    <span>跳至</span>
                    <Input
                        style={{ width: 60 }}
                        value={jumpPageNo}
                        onChange={e => this.onJumpPageChange(e)}
                    />
                    <span>/ {Math.max(Math.ceil(total / pageSize), 1)} 页</span>
                    <Button
                        onClick={() => this.handleJumpPageChange()}
                    >
                        跳转
                    </Button>
                </div>
            </div>
        );
    }
}

Page.defaultProps = {
    pageNo: 1,
    pageSize: 10,
    total: 0
};

export default Page;
