import axios from "axios";

export const httpCall = ({ url, method = 'POST', data }: 
{url?: any, method: string, data?:any } ) => {
    // Default options are marked with *
    return axios.post(url, {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        ...["POST", 'PUT', "PATCH", "UPDATE"].includes(method) && { body: new FormData(data) }, // body data type must match "Content-Type" header

    }).then(response => console.log({response})).catch(err => err);
}
