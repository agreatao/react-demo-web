import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Empty, Form, Input, Select, Table } from 'antd';
import { download, fetchIolList } from 'api/pay';
import { userList } from 'api/user';
import { go } from 'components/User';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useDebounce } from 'utils/hooks';
import './list.less';

const { Option } = Select;

const useData = (currentPage, pageSize, userId, fileName) => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => ({ user: state.user }));
    const [loading, setLoading] = useState(false);

    const request = useDebounce(async (currentPage, pageSize, userId, fileName) => {

        try {
            if (user) {
                setLoading(true);
                const data = await fetchIolList.send({ userId, fileName }, { params: { currentPage, pageSize } });
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
}

export default function IolList() {
    const { user, lang } = useSelector(state => ({ user: state.user, lang: state.locale.lang }));
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [{ fileName, userId }, setSearch] = useState({ fileName: null, userId: null });
    const [userData, setUserData] = useState([]);
    const [form] = Form.useForm();
    const intl = useIntl();
    const history = useHistory();

    useEffect(() => {
        if (user?.isAdmin) {
            userList.send({ isAdmin: 0 })
                .then(data => {
                    setUserData(data);
                }).catch(e => {
                    setUserData([]);
                    console.error(e);
                });
        } else {
            setUserData([]);
        }
    }, [user])

    function handleDownload(item) {
        download.send({ params: { id: item.id } }).then(data => {
            console.log(data);
        }).catch(e => console.error(e));
    }

    const columns = [
        {
            title: intl.formatMessage({ id: 'ATTR_FILENAME' }),
            dataIndex: 'fileName',
            render: (fileName, row) => <a onClick={() => handleDownload(row)}>{fileName}</a>
        },
        {
            title: intl.formatMessage({ id: 'ATTR_ZZTYPE' }),
            dataIndex: 'zzType',
        },
        {
            title: intl.formatMessage({ id: 'ATTR_UPLOADER' }),
            dataIndex: 'user'
        },
        {
            title: intl.formatMessage({ id: 'ATTR_CREATEDATE' }),
            dataIndex: 'createDate',
            render: date => moment(date).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: intl.formatMessage({ id: 'ATTR_STATUS' }),
            dataIndex: 'status'
        },
        {
            className: 'operation',
            title: intl.formatMessage({ id: 'ATTR_OPERATION' }),
            key: 'operation',
            render: () => <React.Fragment>
                <a>{intl.formatMessage({ id: 'BTN_GET_RESULT' })}</a>
                {!!user?.isAdmin ? <a>{intl.formatMessage({ id: 'BTN_INPUT_RESULT' })}</a>
                    : <a>{intl.formatMessage({ id: 'BTN_APPLYREFUND' })}</a>}
            </React.Fragment>
        }
    ]

    const [data] = useData(currentPage, pageSize, !!user?.isAdmin ? userId : user?.id, fileName);

    function handleSearch(values) {
        setSearch(values);
    }

    function handleReset() {
        form.resetFields();
    }

    function goBack() {
        history.push(`/${lang}/calc/iol`);
    }

    return <React.Fragment>
        <Breadcrumb className="iol-list-breadcrumb">
            <Breadcrumb.Item onClick={goBack}>
                <a title={intl.formatMessage({ id: 'BTN_BACK' })}><HomeOutlined /></a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{intl.formatMessage({ id: 'LABEL_OUTPUT' })}</Breadcrumb.Item>
        </Breadcrumb>
        <Form form={form} colon={false} layout="inline" style={{ marginBottom: 10 }} onFinish={handleSearch}>
            <Form.Item name='fileName' label={intl.formatMessage({ id: 'ATTR_FILENAME' })}>
                <Input autoComplete="off" />
            </Form.Item>
            {!!user?.isAdmin && <Form.Item name='userId' label={intl.formatMessage({ id: 'ATTR_USER' })}>
                <Select style={{ width: 100 }}>
                    {userData.map(item => <Option key={item.id} value={item.id}>{item.nickname}</Option>)}
                </Select>
            </Form.Item>}
            <Form.Item><Button type='primary' htmlType='submit'>{intl.formatMessage({ id: 'BTN_SEARCH' })}</Button><Button onClick={handleReset}>{intl.formatMessage({ id: 'BTN_CLEAR' })}</Button></Form.Item>
        </Form>
        <Table
            columns={columns}
            dataSource={data}
            rowKey='id'
            pagination={{
                current: currentPage,
                pageSize,
                onChange(page) {
                    setCurrentPage(page);
                }
            }}
            locale={{
                emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={intl.formatMessage({ id: user ? 'TEXT_DEFAULT_EMPTY' : 'TEXT_NOSIGNIN_EMPTY' })}>
                    {!user && <Button type='primary' onClick={() => go('login')}>{intl.formatMessage({ id: 'BTN_LOGIN' })}</Button>}
                </Empty>
            }}
        />
    </React.Fragment>
}