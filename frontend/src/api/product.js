import { api } from "./api";

export async function FetchAll(productType) {

    const response = await api('GET', `product/type/${productType}`, {
        mode: 'cors',
    })
    if (!response || ("product" in response) === false) throw new Error("Missing products data")

    else return response.product

}

export async function FetchProduct(productId) {

    const response = await api('GET', `product/${productId}`, {
        mode: 'cors',
    })
    if (!response || ("product" in response) === false) throw new Error("Missing product data")

    else return response.product
}
