import { message } from 'antd';

export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IBackendResHistory<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T[];
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface IRegister {
        _id: string;
        email: string;
        fullName: string;
    }

    interface ILogin {
        access_token: string;
        user: {
            email: string;
            phone: string;
            fullName: string;
            role: string;
            avatar: string;
            id: string;
        }
    }

    interface IUser {
        email: string;
        phone: string;
        fullName: string;
        role: string;
        avatar: string;
        id: string;
    }

    interface IFetchAccount {
        user: IUser
    }

    interface IUserTableAdmin {
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


    interface IResponseImport {
        countSuccess: number;
        countError: number;
        detail: any;
    }

    interface ICategory {
        error?: string | string[];
        message: string;
        data?: string[];
    }

    interface ICarts {
        id: string;
        quantityProducts: number;
        detail: IBookAdmin;
    }

    interface IOrder<T> {
        name: string;
        address: string;
        phone: string;
        totalPrice: number;
        type: string;
        detail: T[]
    }

    interface IItemOrder {
        bookName: string;
        quantity: number,
        _id: string;
    }
    interface IHistory {
        _id: string;
        name: string;
        type: string;
        email: string;
        phone: string;
        userId: string;
        detail:
        {
            bookName: string;
            quantity: number;
            _id: string;
        }[];
        totalPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IDataHistory<T> {
        _id: string;
        name: string;
        type: string;
        email: string;
        phone: string;
        userId: string;
        detail: T[];
        totalPrice: number;
        paymentStatus: string;
        paymentRef: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

}

