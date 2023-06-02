import { api } from "./api";

export async function FetchAll(query) {
    console.log({query})
    let response = await api('GET', `product/?${query}`, {
        mode: 'cors',
    })
    response = await api('GET', `product/?${query}`, {
        mode: 'cors',
    })
    
    if (!response) throw new Error("Missing product type data")

    else return response

}