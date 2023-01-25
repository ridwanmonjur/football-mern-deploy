import { Request, Response, NextFunction } from 'express'

import { Product } from "../models/Product"    // need to specify the object imported from the module to use it later
// import { rainbow, red, green } from 'colors'

export async function getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let products = await Product.find({})
        res.json({ "success": true, products })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let product = await Product.findById(req.params.productId)
        res.json({ "success": true, product })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function getProductBytType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let product = await Product.find({ type: req.params.productType })
        res.json({ "success": true, product })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}
