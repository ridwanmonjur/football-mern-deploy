import { Request, Response, NextFunction } from 'express'
const ObjectID = require("mongodb").ObjectID
import { Cart, CartInterface } from "../models/Cart"    // need to specify the object imported from the module to use it later
import { Product } from '../models/Product'
import { addToEditCartPartTwo, getTwoArrays, deleteCartHelper } from '../helper/cart'

/* /api/v1/user/:userId/cart */
/* /api/v1/cart/ */

export async function getCart(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart;
    /* /api/v1/user/:userId */
    try {
        cart = await Cart.findOne({ user: req.user, status: "active" }).populate('products', 'name image price type')
        if (cart !== null) {
            res.json({ "success": true, cart })
        }
        else {
            res.json({ "success": false, cart })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })

    }
}

export async function getCarts(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        let cart = await Cart.find({ user: req.user }).populate('products', 'name image price type')
        res.json({ "success": true, cart })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }

}

/* /api/v1/user/:userId/product/:productId */
/* /api/v1/cart/:productId  IS NOT NEED*/
// http://localhost:5000/api/v1/user/6145c83d99a4fb28ec7c8318


export async function addToCartPartTwo(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        if (req.params.productId && req.user) {
            let cart: CartInterface | null = await addToEditCartPartTwo("add", req, res, next)
            if (cart === null) res.json({ cart, success: false })
            else res.json({ cart, success: true })
        }
        else {
            /* /api/v1/cart/ */
            res.json({ "success": false, wrongMessage: "wrong URL man!" })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function editCartQuantity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        if (req.params.productId && req.user) {
            let cart: CartInterface | null = await addToEditCartPartTwo("editQuantity", req, res, next)
            if (cart === null) res.json({ cart, success: false })
            else res.json({ cart, success: true })
        }
        else {
            /* /api/v1/cart/ */
            res.json({ "success": false, wrongMessage: "wrong URL man!" })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}



export async function deleteCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        if (req.user && req.params.deleteProductIndex) {

            let { productId, quantity } = await deleteCartHelper(req, res, next)

            await Product.findByIdAndUpdate(productId, { $inc: { "stock": quantity } })

            res.json({ "success": true, index: req.params.deleteProductIndex })
        }

        else {
            /* /api/v1/cart/ */
            res.json({ "success": false, wrongMessage: "wrong URL man!" })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}


/* /api/v1/user/:userId/product/:productId */
/* /api/v1/cart/:productId  IS NOT NEED*/
// http://localhost:5000/api/v1/user/6145c83d99a4fb28ec7c8318
export async function getProductOfCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        // guard routes
        if (req.params.productId && req.user) {

            let index
            index = await getTwoArrays(req, res, next)

            res.json({ "success": true, index })

        }

        else {
            /* /api/v1/cart/ */
            res.json({ "success": false, wrongMessage: "wrong URL man!" })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function getNewCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        // guard routes
        if (req.user) {

            await Cart.updateMany(
                { user: ObjectID(req.user), status: "active" },
                { status: "paid", paidAt: new Date() }
            )
            let cart = await Cart.create({
                user: ObjectID(req.user),
                status: "active"
            })
            res.json({ "success": true, cart })
        }

        else {
            /* /api/v1/cart/ */
            res.json({ "success": false, wrongMessage: "wrong URL man!" })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function editStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // guard routes
        if (req.user && req.params.cartId) {
            await Cart.findByIdAndUpdate(
                { user: ObjectID(req.params.cartId) },
                { status: req.body.status }
            )
        }

        else {
            /* /api/v1/cart/ */
            res.json({ "success": false, wrongMessage: "wrong URL man!" })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

// user/6144b931946d8f1a18dea0d4
// product/6144b933946d8f1a18dea0fe
// user/6144b931946d8f1a18dea0d4/product/6144b933946d8f1a18dea0fe


  // if (index != -1) {
            // let filter = {
            //     user: req.user,
            //     status: "active"
            //     products: {
            //         "$in": [req.params.productId],
            //     },
            //     description: {
            //         "$elemMatch": { size }
            //         // Starting in MongoDB 4.4, the $ projection operator can only
            //         //  appear at the end of the field path; e.g. "field.$" or "fieldA.fieldB.$".
            //         // "products.$": req.params.productId
            //     }
            // }
            // let update = {
            //     $set: {
            // Mongodb doesn't support this nested pattern anymore
            //         "description.$.quantity": quantity, "description.$.size": size
            //     }
            // }
            // cart = await Cart.findOneAndUpdate(filter, update)
        // }
        // $project : { id }
        //  { products: { "$in": [req.params.productId] } }
        //  description: { "$elemMatch": { size } }

        // products: {
        //     // You can't use $elemMatch in a $project stage. 
        //     // "$elemMatch": req.params.productId,
        //     // but you can achieve the same result using other aggregation operators like $filter.
        //     $filter: {
        //         input: "$products",
        //         as: "item",
        //         cond: {$eq: ["$$item", ObjectID(req.params.productId)]}
        //        }
        // },
        // description: {
        //     // You can't use $elemMatch in a $project stage. 
        //     // "$elemMatch": req.params.productId,
        //     // but you can achieve the same result using other aggregation operators like $filter.
        //     $filter: {
        //         input: "$products",
        //         as: "item",
        //         cond: {$eq: ["$$item", ObjectID(req.params.productId)]}
        //        }
        // },

        // 