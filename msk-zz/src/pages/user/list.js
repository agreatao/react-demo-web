import { ArrowLeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Empty, Form, Input, Select, Table, Tag } from "antd";
import { download, fetchIolList, setResult } from "api/pay";
import { userList } from "api/user";
import { go } from "components/User";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useDebounce } from "utils/hooks";
import "./list.less";

const { Option } = Select;

const EditCell = ({ editing, dataIndex, title, record, index, children, ...restProps }) => {
    const intl = useIntl();
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage(
                                {
                                    id: "form.rules.required.field",
                                },
                                { field: title }
                            ),
                        },
                    ]}
                >
                    <Input autoComplete="off" size="small" />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditTable = ({ dataSource, currentPage, onPageChange, ...restProps }) => {
    const { user } = useSelector((state) => ({ user: state.user }));
    const [form] = Form.useForm();
    const [editingID, setEditingID] = useState("");
    const [data, setData] = useState(dataSource);
    const intl = useIntl();

    useEffect(() => {
        setData(dataSource);
    }, [dataSource]);

    const isEditing = (row) => row.id === editingID;

    const edit = (row) => {
        form.setFieldsValue({
            ...row,
        });
        setEditingID(row.id);
    };

    const cancel = () => {
        setEditingID("");
    };

    const save = async (row) => {
        try {
            const values = await form.validateFields();
            await setResult.send({
                id: row.id,
                resultContent: values.resultContent,
            });
            const newData = [...data];
            const index = newData.findIndex((item) => row.id === item.id);
            if (index > -1) {
                newData[index].resultContent = values.resultContent;
                setData(newData);
                cancel();
            }
        } catch (e) {}
    };

    const columns = [
        {
            title: intl.formatMessage({ id: "col.filename" }),
            dataIndex: "fileName",
            render: (fileName, row) => (
                <a href={download(row.id)} target="_blank">
                    {fileName}
                </a>
            ),
        },
        {
            title: intl.formatMessage({ id: "col.zzType" }),
            dataIndex: "zzType",
        },
        {
            title: intl.formatMessage({ id: "col.uploader" }),
            dataIndex: "user",
        },
        {
            title: intl.formatMessage({ id: "col.createDate" }),
            dataIndex: "createDate",
            render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: intl.formatMessage({ id: "col.status" }),
            dataIndex: "status",
            render: (status) =>
                status && (
                    <Tag
                        color={
                            status === "WAIT_BUYER_PAY"
                                ? "processing"
                                : status === "TRADE_SUCCESS"
                                ? "success"
                                : status === "TRADE_CLOSED"
                                ? "default"
                                : status === "TRADE_FINISHED"
                                ? "default"
                                : ""
                        }
                    >
                        {intl.formatMessage({ id: `col.status.${status}` })}
                    </Tag>
                ),
        },
        {
            title: intl.formatMessage({ id: "col.result" }),
            dataIndex: "resultContent",
            width: 170,
            editable: true,
        },
        {
            className: "operation",
            title: intl.formatMessage({ id: "col.operation" }),
            key: "operation",
            render: (_, row) => (
                <React.Fragment>
                    {!!user?.isAdmin ? (
                        isEditing(row) ? (
                            [
                                <a key="save" onClick={() => save(row)}>
                                    {intl.formatMessage({ id: "btn.save" })}
                                </a>,
                                <a key="cancel" onClick={cancel}>
                                    {intl.formatMessage({ id: "btn.cancel" })}
                                </a>,
                            ]
                        ) : (
                            <a disabled={editingID !== ""} onClick={() => edit(row)}>
                                {intl.formatMessage({ id: "btn.inputResult" })}
                            </a>
                        )
                    ) : (
                        <a>{intl.formatMessage({ id: "btn.applyRefund" })}</a>
                    )}
                </React.Fragment>
            ),
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                index: `${col.dataIndex}-${record.id}`,
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                {...restProps}
                components={{
                    body: {
                        cell: EditCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: 10,
                    onChange(page) {
                        onPageChange(page);
                        cancel();
                    },
                }}
                locale={{
                    emptyText: (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={intl.formatMessage({
                                id: user ? "text.noLogin" : "text.noData",
                            })}
                        >
                            {!user && (
                                <Button type="primary" onClick={() => go("login")}>
                                    {intl.formatMessage({ id: "btn.login" })}
                                </Button>
                            )}
                        </Empty>
                    ),
                }}
            />
        </Form>
    );
};

const useData = (currentPage, pageSize, userId, fileName) => {
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => ({ user: state.user }));
    const [loading, setLoading] = useState(false);

    const request = useDebounce(async (currentPage, pageSize, userId, fileName) => {
        try {
            if (user) {
                setLoading(true);
                const data = await fetchIolList.send(
                    { userId, fileName },
                    { params: { currentPage, pageSize } }
                );
                setData(data);
                setLoading(false);
            } else {
                setData([]);
            }
        } catch (e) {
            setData([]);
            setLoading(false);
            console.error(e);
        }
    }, 1000);

    useEffect(() => {
        request(currentPage, pageSize, userId, fileName);
    }, [currentPage, pageSize, userId, fileName]);

    return [data, loading];
};

export default function IolList() {
    const { user, lang } = useSelector((state) => ({ user: state.user, lang: state.locale.lang }));
    const [{ fileName, userId }, setSearch] = useState({ fileName: null, userId: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [userData, setUserData] = useState([]);
    const [form] = Form.useForm();
    const intl = useIntl();
    const history = useHistory();

    useEffect(() => {
        if (user?.isAdmin) {
            userList
                .send({ isAdmin: 0 })
                .then((data) => {
                    setUserData(data);
                })
                .catch((e) => {
                    setUserData([]);
                    console.error(e);
                });
        } else {
            setUserData([]);
        }
    }, [user]);

    const [data] = useData(currentPage, 10, !!user?.isAdmin ? userId : user?.id, fileName);

    function handleSearch(values) {
        setSearch(values);
    }

    function handleReset() {
        form.resetFields();
    }

    function goBack() {
        history.push(`/${lang}/calc/iol`);
    }

    return (
        <React.Fragment>
            <Breadcrumb className="iol-list-breadcrumb">
                <Breadcrumb.Item onClick={goBack}>
                    <a title={intl.formatMessage({ id: "btn.back" })}>
                        <ArrowLeftOutlined />
                    </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{intl.formatMessage({ id: "text.output" })}</Breadcrumb.Item>
            </Breadcrumb>
            <Form
                form={form}
                colon={false}
                layout="inline"
                style={{ marginBottom: 10 }}
                onFinish={handleSearch}
            >
                <Form.Item
                    name="fileName"
                    label={intl.formatMessage({ id: "form.field.filename" })}
                >
                    <Input autoComplete="off" />
                </Form.Item>
                {!!user?.isAdmin && (
                    <Form.Item name="userId" label={intl.formatMessage({ id: "form.field.user" })}>
                        <Select style={{ width: 100 }}>
                            {userData.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.nickname}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {intl.formatMessage({ id: "btn.search" })}
                    </Button>
                    <Button onClick={handleReset}>{intl.formatMessage({ id: "btn.clear" })}</Button>
                </Form.Item>
            </Form>
            <EditTable
                dataSource={data}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </React.Fragment>
    );
}
