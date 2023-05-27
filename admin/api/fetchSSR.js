import axios from "axios";
import { getCookie } from 'cookies-next';

export const fetchSSR = ({ req, res }) => {

    const axiosSSR = axios.create({
        baseURL: "http://localhost:8000/api/v1",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        withCredentials: true
    });

    axiosSSR.interceptors.request.use(
        async config => {
            if (getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, { req, res }))
                config.headers = {
                    'Authorization': getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, { req, res }),
                }
            return config;
        },
        error => {
            Promise.reject(error)
        });


    axiosSSR.interceptors.response.use(
        (response) => {
            return response.data
        },
    );

    return axiosSSR;
}