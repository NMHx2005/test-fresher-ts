import axios from "services/axios.customize"

// Register
export const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = { fullName, email, password, phone };
    return axios.post<IBackendRes<IRegister>>(URL_BACKEND, data);
}

// Login
export const loginAPI = (username: string, password: string) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = { username, password };
    return axios.post<IBackendRes<ILogin>>(URL_BACKEND, data, {
        headers: {
            delay: 3000
        }
    });
}

// Account
export const fetchAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get<IBackendRes<IFetchAccount>>(URL_BACKEND, {
        headers: {
            delay: 2000
        }
    });
}



// Logout
export const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}


// UserTableAdmin
export const dataUserTableAdmin = (current: number, pageSize: number) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get<IBackendRes<IModelPaginate<IUserTableAdmin>>>(URL_BACKEND);
}


// getUserAPI
export const getUsersAPI = (query: string) => {
    const URL_BACKEND = `/api/v1/user?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IUserTableAdmin>>>(URL_BACKEND);
}


// createAPI 
export const createAPI = (fullName: string, email: string, password: string, phone: string) => {
    const URL_BACKEND = `/api/v1/user`;
    const data = { fullName, email, password, phone };
    return axios.post<IBackendRes<IModelPaginate<IUserTableAdmin>>>(URL_BACKEND, data);
}


// bulk-create
export const bulkCreateUserAPI = (nmhx: {
    fullName: string;
    password: string;
    email: string;
    phone: string;
}[]) => {
    const urlBackend = "/api/v1/user/bulk-create";
    return axios.post<IBackendRes<IResponseImport>>(urlBackend, nmhx)
}


// Update User 
export const updateUser = (_id: string, fullName: string, phone: string) => {
    const URL_BACKEND = `/api/v1/user`;
    const data = { _id, fullName, phone };
    return axios.put<IBackendRes<IUserTableAdmin>>(URL_BACKEND, data);
}

// delete user
export const deleteUser = (id: string) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete<IBackendRes<IUserTableAdmin>>(URL_BACKEND);
}

// getBookAPI
export const getBookAPI = (query: string) => {
    const URL_BACKEND = `/api/v1/book?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IBookAdmin>>>(URL_BACKEND);
}

// getBookById
export const getBookById = (id: string) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.get<IBackendRes<IBookAdmin>>(URL_BACKEND, {
        headers: {
            delay: 3000
        }
    });
}

// getCategoryAPI
export const getCategoryAPI = () => {
    const URL_BACKEND = `/api/v1/database/category`;
    return axios.get<ICategory>(URL_BACKEND);
}


// uploadImage
export const callUploadBookImg = (fileImg: any, folder: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios<IBackendRes<{
        fileUploaded: string
    }>>({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": folder
        },
    });
}


// createBookAPI
export const createBookAPI = (thumbnail: string, slider: string[], mainText: string, author: string, price: number, quantity: number, category: string) => {
    const URL_BACKEND = `/api/v1/book`;
    const data = { thumbnail, slider, mainText, author, price, quantity, category };
    return axios.post<IBackendRes<IBookAdmin>>(URL_BACKEND, data);
}

// update Book API
export const updateBookAPI = (
    _id: string,
    mainText: string, author: string,
    price: number, quantity: number, category: string,
    thumbnail: string, slider: string[]
) => {
    const urlBackend = `/api/v1/book/${_id}`;
    return axios.put<IBackendRes<IRegister>>(urlBackend,
        { mainText, author, price, quantity, category, thumbnail, slider })
}


// Delete Book API
export const deleteBookAPI = (_id: string) => {
    const urlBackend = `/api/v1/book/${_id}`;
    return axios.delete<IBackendRes<IRegister>>(urlBackend);
}


// Order API
export const orderAPI = (data: IOrder<IItemOrder>) => {
    const URL_BACKEND = `/api/v1/order`;
    return axios.post<IBackendRes<IBookAdmin>>(URL_BACKEND, data);
}


// History API
export const historyAPI = () => {
    const URL_BACKEND = `api/v1/history`;
    return axios.get<IBackendRes<IHistory[]>>(URL_BACKEND);
}