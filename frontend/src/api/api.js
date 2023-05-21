import { cookieKey, hostName } from "./env"
export async function api(methodName, endpoint, { body, ...customConfig } = {}) {

    const headers = { 'content-type': 'application/json' }
    const token = getCookie(cookieKey)
    console.log({ token, cookieKey, hostName })
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

    const { response } = await window
        .fetch(`${hostName}/${endpoint}`, config)

    return response
        .then(response => {
            if (response.status === 401) {
                return window
                    .fetch(`${hostName}/refreshToken}`)
                    .then((res) => res.json())
                    .then((refreshResponse) => {
                        console.log({ refreshResponse })
                        headers.authorization = refreshResponse['accessToken']
                    })
                    .then(() => {
                        return window.fetch(`${hostName}/${endpoint}`, config).then((res) => res.json())
                    })
            }
            else return response.json()
        })
    // .then(response=> response)
    // .then(response => {
    //     console.log(response)
    //     return response
    // })

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