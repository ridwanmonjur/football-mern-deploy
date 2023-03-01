import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HTTP404NotFoundError } from '../exceptions/AppError';
import { Product } from "../models/Product";

export async function getProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {

    let products = await Product.find({});
    if (!products) throw new HTTP404NotFoundError();
    res.status(200).json({ success: true, products });
}

export async function getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    let product = await Product.findById(req.params.productId);
    if (!product) throw new HTTP404NotFoundError();
    res.json({ success: true, product });

}

export async function getProductBytType(req: Request, res: Response, next: NextFunction): Promise<void> {
    let product = await Product.find({ type: req.params.productType });
    if (!product) throw new HTTP404NotFoundError();
    res.status(StatusCodes.OK).json({ success: true, product });
}
