import { api } from "./api";

export async function Signup(body) {
    
    let response= await api('POST', 'signUp', {
        body, mode: 'cors',
    })

    return response

}

export async function Login(body) {
    
    let response= await api('POST', 'login', {
        body, mode: 'cors',
    })

    return response

}
