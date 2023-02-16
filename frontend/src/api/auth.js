import { api } from "./api";

export async function signup(body) {
    
    let response= await api('POST', 'signUp', {
        body, mode: 'cors',
    })


    return response

}

export async function login(body) {
    
    let response= await api('POST', 'login', {
        body, mode: 'cors',
    })


    return response

}
