import { Button, Modal } from "antd";
import { createNormalCheckDialog } from "components/Dialog/templates";
import { SickInfoFilter } from "components/Filter";
import Table from "components/Table";
import { connect } from "dva";
import React from "react";

function NewNormalCheckDialog({ dispatch, visible, list, total, page }) {

    function handleSelect(data) {
        dispatch({ type: "sickSpecialCheck/toggleNewNormalCheck", newNormalCheckVisible: false });
        createNormalCheckDialog((checkData, { close }) => {
            checkData.sickInfoId = data.id;
            dispatch({ type: "sickSpecialCheck/saveOrUpdate", sickSpecialCheck: checkData });
            close();
        });

    }

    return <Modal destroyOnClose width={800} centered visible={visible} footer={null} onCancel={() => dispatch({ type: "sickSpecialCheck/toggleNewNormalCheck", newNormalCheckVisible: false })}>
        <SickInfoFilter onFilter={filter => dispatch({ type: "sickInfo/filterChange", filter })} />
        <Table
            columns={[
                { title: '病历号', dataIndex: 'sickId', width: 200 },
                { title: '姓名', dataIndex: 'sickName', width: 140 },
                { title: '性别', dataIndex: 'sickSex', width: 120, render: sex => sex == 1 ? "男" : "女" },
                { title: '年龄', dataIndex: 'sickAge', width: 120 },
                { title: '联系方式', dataIndex: 'mobilePhone', width: 180 }
            ]}
            operations={(id, row, index) => <Button size="small" onClick={() => handleSelect(row)}>选择</Button>}
            style={{ height: 480 }}
            list={list}
            {...{ list, total, ...page }}
            onPageChange={(currentPage, pageSize) => dispatch({ type: "sickInfo/pageChange", page: { currentPage, pageSize } })}
        />
    </Modal>
}

export default connect(
    ({ sickSpecialCheck, sickInfo }) => ({
        visible: sickSpecialCheck.newNormalCheckVisible,
        list: sickInfo.list,
        page: sickInfo.page,
        total: sickInfo.total
    })
)(NewNormalCheckDialog)