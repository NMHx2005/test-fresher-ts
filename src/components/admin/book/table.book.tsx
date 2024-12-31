import { getBookAPI } from '@/services/api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import DetailBook from './detail.book';
import CreateBook from './create.book';


type IBookAdmin = {
    _id: string;
    thumbnail: string;
    slider: string[];
    mainText: string;
    author: string;
    price: number;
    sold: number;
    quantity: number;
    category: string;
    createdAt: string;
    updatedAt: string;
};

interface ISearch {
    mainText: string;
    author: string;
}


const TableBook = () => {
    const [openDetailBook, setOpenDetailBook] = useState<boolean>(false);
    const [dataDetailBook, setDataDetailBook] = useState<IBookAdmin | null>(null);

    const [openModalCreate, setOpenModalCreate] = useState(false);

    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });

    const columns: ProColumns<IBookAdmin>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'ID',
            dataIndex: '_id',
            hideInSearch: true,
            render(dom, entity, index, action, schema) {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => {
                                setOpenDetailBook(true);
                                setDataDetailBook(entity);
                            }}
                        >
                            {entity._id}
                        </a>
                    </>
                )
            },
        },
        {
            title: 'Tên Sách',
            dataIndex: 'mainText',
            sorter: true,
        },
        {
            title: 'Thể Loại',
            dataIndex: 'category',
            hideInSearch: true,
            sorter: true,
        },
        {
            title: 'Tác Giả',
            sorter: true,
            dataIndex: 'author'
        },
        {
            title: 'Giá Tiền',
            sorter: true,
            hideInSearch: true,
            dataIndex: 'price',
            render(dom, entity, index, action, schema) {
                return (
                    <>
                        {entity.price.toLocaleString('vi-VN')} VNĐ
                    </>
                )
            },
        },
        {
            title: 'Ngày Cập Nhật',
            sorter: true,
            hideInSearch: true,
            dataIndex: 'updatedAt',
            valueType: "date",
        },
        {
            title: 'Ngày Cập Nhật',
            hideInSearch: true,
            dataIndex: 'updatedAt',
            valueType: "dateRange",
            hideInTable: true,
        },
        {
            title: 'Action',
            hideInSearch: true,
            render(dom, entity, index, action, schema) {
                return (
                    <>
                        <span style={{
                            color: "orange",
                            cursor: "pointer",
                            marginRight: "10px",
                        }}>
                            <EditOutlined />
                        </span>
                        <span style={{
                            color: "red",
                            cursor: "pointer",
                        }}>
                            <DeleteOutlined />
                        </span>
                    </>
                )
            },
        },
    ];

    const refreshTable = () => {
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable<IBookAdmin, ISearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    let query = "";
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`;
                        if (params.mainText) {
                            query += `&mainText=${params.mainText}`;
                        }
                        if (params.author) {
                            query += `&author=${params.author}`;
                        }
                    }

                    // Default sort by createdAt descending if no sort is provided
                    let hasSort = false;
                    if (sort) {
                        const sortFields = ['mainText', 'category', 'author', 'price', 'updateAt'];
                        sortFields.forEach(field => {
                            if (sort[field]) {
                                hasSort = true;
                                const order = sort[field] === "ascend" ? '' : '-';
                                query += `&sort=${order}${field}`;
                            }
                        });
                    }
                    if (!hasSort) {
                        query += "&sort=-createdAt";
                    }

                    try {
                        const res = await getBookAPI(query);
                        if (res.data) {
                            setMeta(res.data.meta);
                            return {
                                data: res.data.result,
                                success: true,
                                total: res.data.meta.total,
                                current: res.data.meta.current,
                            };
                        }
                    } catch (error) {
                        console.error("Error fetching books:", error);
                    }
                    return {
                        data: [],
                        success: false,
                        total: 0
                    };
                }}

                rowKey="_id"
                pagination={{
                    pageSize: meta.pageSize,
                    current: meta.current,
                    total: meta.total,
                    pageSizeOptions: ['5', '10', '20', '30'],
                    showSizeChanger: true,
                }}
                headerTitle="Table Books"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                            setOpenModalCreate(true);
                        }}
                        type="primary"
                    >
                        Add New
                    </Button>
                ]}
            />

            <DetailBook
                openDetailBook={openDetailBook}
                setOpenDetailBook={setOpenDetailBook}
                setDataDetailBook={setDataDetailBook}
                dataDetailBook={dataDetailBook}
            />

            <CreateBook
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                refreshTable={refreshTable}
            />
        </>
    );
}

export default TableBook;