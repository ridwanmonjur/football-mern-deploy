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

    else return response
}

export async function AddProduct(formData) {

    const response = await api('POST', `product`, {
        mode: 'cors', formData,
    })
    if (!response || ("product" in response) === false) throw new Error("Missing product data")

    else return response.product
}

export async function EditProduct(id, formData) {

    const response = await api('PUT', `product/${id}`, {
        mode: 'cors', formData
    })
    if (!response || ("product" in response) === false) throw new Error("Missing product data")

    else return response.product
}


export async function DeleteProductByIds(body) {
    await api('POST', `product/delete`, {
        mode: 'cors', body
    })
}

export async function AddComment(productId, body) {
    console.log({body})
    const response = await api('POST', `product/${productId}/comment`, {
        mode: 'cors', body,
    })
    if (!response || ("comment" in response) === false) throw new Error("Missing comment data")

    else return response.comment
}

export async function EditComment(productId, commentId, body) {
    // /:productId/comment/:commentId
    const response = await api('PUT', `product/${productId}/comment/${commentId}`, {
        mode: 'cors', body
    })
    if (!response || ("comment" in response) === false) throw new Error("Missing comment data")

    else return response.comment
}


export async function DeleteCommentById(productId, commentId) {
    await api('POST', `product/${productId}/comment/${commentId}/delete`, {
        mode: 'cors'
    })
}


