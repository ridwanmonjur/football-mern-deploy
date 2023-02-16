import { cookieKey, hostName } from "./env"
export function api(methodName, endpoint, { body, ...customConfig } = {}) {
    /* 
    customConfig= {
        body: "XXX"
        method: "XXX"
        header: {
            "yyy": "yyy"
        }
    }
    */
    const headers = { 'content-type': 'application/json' }
    const token = getCookie(cookieKey)
    console.log({ token })
    // 1. default we send {'content-type': 'application/json'}
    if (token) {
        //  2. Add auth token
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

    //   3. stringify the body
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

    //   if (response.status === 401) {
    //     logout()
    //     window.location.assign(window.location)
    //     return
    //   }

    // 4. handle action
}

// 5. getCooke(name)
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