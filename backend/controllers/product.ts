import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongoose';
import { HTTP404NotFoundError, HTTP422UnproccessableEntity } from '../exceptions/AppError';
import { ProductInterface } from '../models/Product';
import { ProductService } from '../service/Product';
import { DeleteProductDtos } from '../dto/product';
import { validationHelper } from '../helper/validationHelper';
const ObjectID = require("mongodb").ObjectID;

const service = new ProductService();

export async function getProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let product = await service.getAllProducts();

        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (err) {
        next(err);
    }
}

export async function getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    let productId: undefined | ObjectId;

    let product: undefined | ProductInterface;
    try {
        productId = ObjectID(req.params.productId);

        product = await service.getProductById(productId);

        if (!product) throw new HTTP404NotFoundError("Product is not found");

        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        if (!productId) throw new HTTP422UnproccessableEntity("UserId must be string");

        else next(error);
    }
}

export async function getProductBytType(req: Request, res: Response, next: NextFunction): Promise<void> {
    let type: undefined | string;

    let product: undefined | Array<ProductInterface>;
    try {
        type = req.params.productType;

        // const populate = ['products', 'name image price type'];


        product = await service.getAllProducts({ type });

        if (!product) throw new HTTP404NotFoundError("Products are not found");

        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        if (!type) throw new HTTP422UnproccessableEntity("Type of product must be passed in request parameter correctly.");

        else next(error);
    }
}

export async function deleteProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log({ids: req.body.ids})

        await validationHelper(DeleteProductDtos, req.body)

        await service.deleteProducts(req.body.ids);

        res.status(StatusCodes.NO_CONTENT).json({})
    }
    catch (error) {
        next(error);
    }
}
