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


