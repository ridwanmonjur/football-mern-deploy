import { getCookie, deleteCookie, setCookie } from 'cookies-next';
import axios from "axios";


const configuredAxios = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    },
    withCredentials: true
});

configuredAxios.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN),
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

const refreshToken = async () => {
    return await configuredAxios.post("/refresh", {
    });
}


configuredAxios.interceptors.response.use(
    (response) => {
        return response.data
    }
    // async (err) => {
    //     const originalConfig = err.config;
    //     if (err.response) {
    //         // Access Token was expired
    //         if (err.response.status === 401 && !originalConfig._retry) {
    //             originalConfig._retry = true;
    //             try {
    //                 const rs = await refreshToken();
    //                 const { accessToken } = rs.data;
    //                 setCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, accessToken);
    //                 config.headers = {
    //                     'Authorization': accessToken,
    //                 }
    //                 return instance(originalConfig);
    //             } catch (_error) {
    //                 if (_error.response && _error.response.data) {
    //                     return Promise.reject(_error.response.data);
    //                 }
    //                 return Promise.reject(_error);
    //             }
    //         }

    //         if (err.response.status === 403 && err.response.data) {
    //             return Promise.reject(err.response.data);
    //         }
    //     }
    // }
);

export default configuredAxios;