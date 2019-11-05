import Control from "components/Control";
import { createSpecialCheckDialog } from "components/Dialog/templates";
import { SickSpecialFilter } from "components/Filter";
import Table from "components/Table";
import { connect } from "dva";
import React, { useState } from "react";
import { remove } from "components/alert";
import NewNormalCheckDialog from "../components/NewNormalCheckDialog";

function Index({ height, loading, total, list, page, dispatch }) {
    const [selectedRowKeys, setSelectRowKeys] = useState([]);

    return <div className="sick-normal-check">
        <Control
            onAdd={() => dispatch({ type: "sickSpecialCheck/showNewNormalCheck" })}
            onDelete={() => selectedRowKeys && selectedRowKeys.length > 0 && remove().then(() => {
                dispatch({ type: "sickSpecialCheck/remove", ids: selectedRowKeys });
                setSelectRowKeys([]);
            })}
            filter={<SickSpecialFilter onFilter={filter => dispatch({ type: "sickSpecialCheck/filterChange", filter })} />}
        />
        <Table
            columns={[
                { title: '病历号', dataIndex: 'sickInfo.sickId', width: 200 },
                { title: '姓名', dataIndex: 'sickInfo.sickName', width: 140 },
                { title: '性别', dataIndex: 'sickInfo.sickSex', width: 120, render: sex => sex == 1 ? "男" : "女" },
                { title: '年龄', dataIndex: 'sickInfo.sickAge', width: 120 },
                {
                    title: '报告类型', dataIndex: 'reportType', width: 140, render: type => {
                        switch (type) {
                            case 1: return "近视激光检查";
                            case 2: return "ICL检查";
                            case 3: return "角膜接触镜检查";
                        }
                    }
                },
                { title: '检查时间', dataIndex: 'inspectDate', width: 180 }
            ]}
            operations={(id, row, index) => <a onClick={() => createSpecialCheckDialog(row, (checkData, { close }) => {
                dispatch({ type: "sickSpecialCheck/saveOrUpdate", sickSpecialCheck: checkData });
                close();
            })}>明细</a>}
            rowSelection={{
                selectedRowKeys,
                onChange: (selectedRowKeys) => setSelectRowKeys(selectedRowKeys)
            }}
            loading={loading}
            style={{ height }}
            list={list}
            total={total}
            currentPage={page.currentPage}
            pageSize={page.pageSize}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "sickSpecialCheck/pageChange", page: { currentPage, pageSize } })}
            onDelete={(id) => dispatch({ type: "sickSpecialCheck/remove", ids: [id] })}
        />
        <NewNormalCheckDialog />
    </div>
}

export default connect(
    ({ browser, sickSpecialCheck, control, loading }) => ({
        height: browser.height - control.height - 95,
        loading: loading.effects["sickSpecialCheck/search"],
        total: sickSpecialCheck.total,
        list: sickSpecialCheck.list,
        page: sickSpecialCheck.page
    })
)(Index);