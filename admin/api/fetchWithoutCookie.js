import axios from "axios";

export const fetchWithoutCookie = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    },
});


fetchWithoutCookie.interceptors.response.use(
    (response) => {
        console.log({response})
        return response.data
    }
);

