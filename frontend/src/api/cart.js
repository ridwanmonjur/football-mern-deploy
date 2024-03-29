import { api } from "./api";

export async function AddProductToCart(body, productId) {

    const response = await api('POST', `user/cart/product/${productId}`, {
        mode: 'cors', body
    })
    return response

}

export async function EditCartProduct(body, productId) {

    const response = await api('PUT', `user/cart/product/${productId}`, {
        mode: 'cors', body
    })
    return response

}

export async function DeleteProduct(deleteIndex) {
    const response = await api('DELETE', `user/cart/delete/${deleteIndex}`, {
        mode: 'cors'
    })
    return response
}

export async function FetchCart() {

    const response = await api('GET', `cart/projection/cart`, {
        mode: 'cors',
    })
    return response

}


export async function GetAllCarts() {

    const response = await api('GET', `cart`, {
        mode: 'cors',
      })
    return response

}

export async function PostNewCart(body) {

    const response = await api('POST', `cart`, {
        mode: 'cors', body
      })
    return response

}