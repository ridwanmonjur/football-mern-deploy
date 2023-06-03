import { api } from "./api";

export async function FetchAll(query) {
    console.log({query})
    const response = await api('GET', `product/?${query}`, {
        mode: 'cors',
    })
    if (!response) throw new Error("Missing product type data")

    else return response

}

export async function FetchProduct(productId) {

    const response = await api('GET', `product/${productId}`, {
        mode: 'cors',
    })
    if (!response || ("product" in response) === false) throw new Error("Missing product data")

    else return response.product
}

export async function AddProduct(body) {

    const response = await api('POST', `product`, {
        mode: 'cors', body
    })
    if (!response || ("product" in response) === false) throw new Error("Missing product data")

    else return response.product
}

export async function EditProduct(id, body) {

    const response = await api('PUT', `product/${id}`, {
        mode: 'cors', body
    })
    if (!response || ("product" in response) === false) throw new Error("Missing product data")

    else return response.product
}


export async function DeleteProductByIds(body) {
    await api('POST', `product/delete`, {
        mode: 'cors', body
    })
}

