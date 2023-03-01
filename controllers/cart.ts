import { Request, Response, NextFunction } from 'express'
const ObjectID = require("mongodb").ObjectID
import { Cart, CartInterface } from "../models/Cart"    // need to specify the object imported from the module to use it later
import { Product } from '../models/Product'
import { addToEditCartPartTwo, getTwoArrays, deleteCartHelper } from '../helper/cart'


export async function getCart(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart;
    cart = await Cart.findOne({ user: req.user, status: "active" }).populate('products', 'name image price type')
    if (cart !== null) {
        res.json({ success: true, cart })
    }
    else {
        res.json({ success: false, cart })
    }

}

export async function getCarts(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart = await Cart.find({ user: req.user }).populate('products', 'name image price type')
    res.json({ success: true, cart })


}

export async function addToCartPartTwo(req: Request, res: Response, next: NextFunction): Promise<void> {

    if (req.params.productId && req.user) {
        let cart: CartInterface | null = await addToEditCartPartTwo("add", req, res, next)
        if (cart === null) res.json({ cart, success: false })
        else res.json({ cart, success: true })
    }
    else {
        /* /api/v1/cart/ */
        res.json({ success: false, wrongMessage: "wrong URL man!" })
    }
}
    

export async function editCartQuantity(req: Request, res: Response, next: NextFunction): Promise<void> {

    if (req.params.productId && req.user) {
        let cart: CartInterface | null = await addToEditCartPartTwo("editQuantity", req, res, next)
        if (cart === null) res.json({ cart, success: false })
        else res.json({ cart, success: true })
    }
    else {
        /* /api/v1/cart/ */
        res.json({ success: false, wrongMessage: "wrong URL man!" })
    }
}
   



export async function deleteCart(req: Request, res: Response, next: NextFunction): Promise<void> {

    if (req.user && req.params.deleteProductIndex) {

        let { productId, quantity } = await deleteCartHelper(req, res, next)

        await Product.findByIdAndUpdate(productId, { $inc: { "stock": quantity } })

        res.json({ success: true, index: req.params.deleteProductIndex })
    }

    else {
        res.json({ success: false, wrongMessage: "wrong URL man!" })
    }

}


export async function getProductOfCart(req: Request, res: Response, next: NextFunction): Promise<void> {

    if (req.params.productId && req.user) {

        let index
        index = await getTwoArrays(req, res, next)

        res.json({ success: true, index })

    }

    else {
        res.json({ success: false, wrongMessage: "wrong URL man!" })
    }
}
   

export async function getNewCart(req: Request, res: Response, next: NextFunction): Promise<void> {

    if (req.user) {

        await Cart.updateMany(
            { user: ObjectID(req.user), status: "active" },
            { status: "paid", paidAt: new Date() }
        )
        let cart = await Cart.create({
            user: ObjectID(req.user),
            status: "active"
        })
        res.json({ success: true, cart })
    }

    else {
        res.json({ success: false, wrongMessage: "wrong URL man!" })
    }

}

export async function editStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.user && req.params.cartId) {
        await Cart.findByIdAndUpdate(
            { user: ObjectID(req.params.cartId) },
            { status: req.body.status }
        )
    }

    else {
        res.json({ success: false, wrongMessage: "wrong URL man!" })
    }
}
