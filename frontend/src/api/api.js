import { cookieKey, hostName } from "./env"
export function api(methodName, endpoint, { body, ...customConfig } = {}) {
    
    const headers = { 'content-type': 'application/json' }
    const token = getCookie(cookieKey)
    console.log({ token })
    if (token) {
        headers.authorization = token
    }
    let config = {
        ...customConfig,
        method: methodName,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }
    console.log(body)

    return window
        .fetch(`${hostName}/${endpoint}`, config)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response
        })

}

export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    
    return res
}

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(getCookie(cname))
}