import { cookieKey, hostName } from "./env"
export async function api(methodName, endpoint, { body, ...customConfig } = {}) {

    const headers = { 'content-type': 'application/json' }

    let config = {
        signal: AbortSignal.timeout(5000),
        ...customConfig,
        method: methodName,
        headers: {
            ...customConfig.headers,
        },
    }

    if (customConfig.headers == null) {
        config.headers = headers;
    }

    if (customConfig.formData != null) {
        config.body = customConfig.formData
        delete config.formData
        config.headers = {};
    }

    if (body != null) {
        config.body = JSON.stringify(body)
    }

    const token = getCookie(cookieKey)
    if (token != null) {
        config.headers.authorization = token
    }

    console.log({ config })

    const response = await window
        .fetch(`${hostName}/${endpoint}`, config)
        .then(response => {
            if (response.status === 401) {
                return window
                    .fetch(`${hostName}/accessToken}`)
                    .then((res) => res.json())
                    .then((accessResponse) => {
                        console.log({ accessResponse })
                        headers.authorization = accessResponse['accessToken']
                    })
                    .then(() => {
                        return window.fetch(`${hostName}/${endpoint}`, config).then((res) => res.json())
                    })
            }
            else if (response.status === 204) {
                return
            }
            else return response.json()
        })
    return response;

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

export function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}