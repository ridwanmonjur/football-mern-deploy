import { Request, Response, NextFunction } from 'express'

import { Cart, CartInterface } from "../models/Cart"    // need to specify the object imported from the module to use it later
const ObjectID = require("mongodb").ObjectID
import { Product } from '../models/Product'

/* /api/v1/user/:userId/cart */
/* /api/v1/cart/ */

interface IndexInterface {
    sameId: Array<any>,
    sameSize: Array<any>
}


export async function addToEditCartPartTwo(addOrEdit: string, req: Request, res: Response, next: NextFunction): Promise<CartInterface | null> {

    let isSame: boolean = false
    let currentQuantity: number = 0;
    let cart: CartInterface | null = await Cart.findOne({ user: ObjectID(req.newUser), status: "active" })

    if (cart !== null && cart.description !== undefined) {
        cart.products.forEach(async function (value, index,) {
            if (value.toString() === req.params.productId && cart?.description[index].size === req.body.size) {
                currentQuantity = parseInt(req.body.quantity)
                if (addOrEdit === "add") {
                    if (cart !== null) cart.description[index].quantity += parseInt(req.body.quantity)
                }
                if (addOrEdit === "editQuantity") {
                    if (cart !== null) cart.description[index].quantity = parseInt(req.body.quantity)
                }
                isSame = true
            }
            console.log('saved')
        })
        if (isSame) {
            await cart?.save()
        }
        else {
            if (addOrEdit === "add") {
                await Cart.updateOne(
                    { user: ObjectID(req.newUser), status: "active" },
                    { $push: { products: req.params.productId, description: { quantity: parseInt(req.body.quantity), size: req.body.size } } },
                )
            }
        }
        if (addOrEdit === "add") {
            await Product.findByIdAndUpdate(req.params.productId, { $inc: { "stock": -1 * parseInt(req.body.quantity) } })
        }
        else
            await Product.findByIdAndUpdate(req.params.productId, { $inc: { "stock": currentQuantity + (-1 * parseInt(req.body.quantity) ) } })
    }
    return cart

}


export async function deleteCartHelper(req: Request, res: Response, next: NextFunction): Promise<{  productId: string | null, quantity: number | null }> {

    let index: number = parseInt(req.params.deleteProductIndex)
    let quantity: number | null= null
    let productId: string | null= null
    let cart: CartInterface | null = await Cart.findOne({ user: ObjectID(req.newUser), status: "active" })

    if (cart !== null && cart.description !== undefined && cart.products !== undefined) {
    
        productId = cart.products[index].toString()
        quantity = cart.description[index].quantity
        cart.products= cart.products.filter(function (value, currindex){
            return currindex !== index
        })
        cart.description= cart.description.filter(function (value, currindex){
            return currindex !== index
        })
        
        await cart.save()
    
    }
    return { productId, quantity }

}

export async function getTwoArrays(req: Request, res: Response, next: NextFunction): Promise<Array<IndexInterface>> {
    let index;
    index = await Cart.aggregate(
        [{ $match: { user: ObjectID(req.newUser), status: "active" } },
        {
            "$project": {
                "_id": 0,
                "products": {
                    "$map": {
                        "input": { "$zip": { "inputs": ["$products", "$description"] } },
                        "as": "el",
                        "in": {
                            "product": { "$arrayElemAt": ["$$el", 0] },
                            "description": { "$arrayElemAt": ["$$el", 1] }
                        }
                    }
                }
            },
        },
        {
            "$project": {
                sameId: {
                    $filter: {
                        input: "$products",
                        as: "elem",
                        cond: {
                            $eq: ["$$elem.product", ObjectID(req.params.productId)],
                        },
                    }
                },
                sameSize: "$products"
            }
        },
        {
            "$project": {
                sameId: 1,
                sameSize: {
                    $filter: {
                        input: "$sameId",
                        as: "elem",
                        cond: {
                            $eq: ["$$elem.description.size", req.body.size],
                        },
                    }
                },
            }
        }
            // {}
        ])
    return index
}