import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongoose';
import { APIError, HTTP404NotFoundError } from '../exceptions/AppError';
import { ProductInterface } from '../models/Product';
import { ProductService } from '../service/Product';
const ObjectID = require("mongodb").ObjectID;

const service = new ProductService();

export async function getProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let products = await service.getAllProducts();

        res.status(StatusCodes.OK).json({ success: true, products });
    }
    catch (err) {
        next(err);
    }
}

export async function getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    let productId: undefined | ObjectId;

    let product: undefined | ProductInterface;
    try {
        productId = ObjectID(req.params.userId);

        product = await service.getProductById(productId);

        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        if (!productId) throw new APIError("UserId must be string");

        else next(error);
    }
}

export async function getProductBytType(req: Request, res: Response, next: NextFunction): Promise<void> {
    let type: undefined | string;

    let product: undefined | ProductInterface;
    try {
        type = req.params.productType;
        
        product = await service.findOneProduct({ type });
        
        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        if (!type) throw new APIError("Type of product must be passed in request parameter correctly.");

        else next(error);
    }
}
