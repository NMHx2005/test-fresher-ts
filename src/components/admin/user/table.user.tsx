import { getUsersAPI } from '@/services/api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { dateRangeValidate } from '@/helpers/helper';
import UserDetail from './user.detail';
import CreateUser from './create.user';

type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: string;
}

interface IUser {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TableUser = () => {
    const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [dataUser, setDataUser] = useState<IUser | null>(null);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })

    const handleClick = (entity: IUserTableAdmin) => {
        setOpenModalDetail(true);
        setDataUser(entity);
    }

    const columns: ProColumns<IUserTableAdmin>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Id',
            dataIndex: '_id',
            hideInSearch: true,
            render: (dom, entity, index, action, schema) => {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => handleClick(entity)}
                        >
                            {entity._id}
                        </a>
                    </>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            copyable: true
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'date',
            sorter: true,
            hideInSearch: true
        },
        {
            title: 'Created At',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true,
        },
        {
            title: 'Action',
            hideInSearch: true,
            render(dom, entity, index, action, schema) {
                return (
                    <>
                        <span style={{ color: "orange", cursor: "pointer", marginRight: "10px" }}><EditOutlined /></span>
                        <span style={{ color: "red", cursor: "pointer" }}><DeleteOutlined /></span>
                    </>
                )
            },
        },

    ];

    const actionRef = useRef<ActionType>();

    const refreshTable = () => {
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable<IUserTableAdmin, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {

                    // Làm phần sort của createdAt
                    let query = "";
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`
                        if (params.email) {
                            query += `&email=/${params.email}/i`
                        }
                        if (params.fullName) {
                            query += `&fullName=/${params.fullName}/i`
                        }
                        const createDateRange = dateRangeValidate(params.createdAtRange);
                        if (createDateRange) {
                            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`
                        }
                    }
                    if (sort.createdAt) {
                        if (sort.createdAt === "ascend") {
                            query += `&sort=createdAt`;
                        } else {
                            query += `&sort=-createdAt`;
                        }
                    }

                    query += `&sort=-createdAt`


                    const res = await getUsersAPI(query);
                    if (res.data) {
                        setMeta(res.data.meta);
                    }
                    return {
                        data: res.data?.result,
                        page: meta.pages,
                        "success": true,
                        total: meta.total
                    }

                }}
                rowKey="_id"
                pagination={{
                    pageSize: meta.pageSize,
                    pageSizeOptions: ['5', '10', '20', '30'],
                    current: meta.current,
                    total: meta.total,
                    showSizeChanger: true
                    // // onChange: (page) => console.log(page)

                }}
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setOpenModalCreate(true);
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}
            />
            <UserDetail
                setOpenModalDetail={setOpenModalDetail}
                openModalDetail={openModalDetail}
                dataUser={dataUser}
                setDataUser={setDataUser}
            />

            <CreateUser
                openModalCreate={openModalCreate}
                refreshTable={refreshTable}
                setOpenModalCreate={setOpenModalCreate}
            />
        </>
    );
};

export default TableUser;