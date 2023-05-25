import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongoose';
import { HTTP404NotFoundError, HTTP422UnproccessableEntity } from '../exceptions/AppError';
import { ProductInterface } from '../models/Product';
import { ProductService } from '../service/Product';
import { CreateProductDto, DeleteProductDtos, EditProductDto, ProductFilter } from '../dto/product';
import { validationHelper } from '../helper/validationHelper';
const ObjectID = require("mongodb").ObjectID;

const service = new ProductService();

export async function getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await validationHelper(ProductFilter, req.query)

        const query = Object.keys(req.query).length > 0? req.query : {} as ProductFilter

        let product = await service.getAllProducts(query);

        if (product == null) throw new HTTP404NotFoundError("Product is not found");

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

        if (product == null) throw new HTTP404NotFoundError("Product is not found");

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

        product = await service.getAllProducts({ type });

        if (product==null) throw new HTTP404NotFoundError("Products are not found");

        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        if (!type) throw new HTTP422UnproccessableEntity("Type of product must be passed in request parameter correctly.");

        else next(error);
    }
}

export async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const productDto: CreateProductDto = await validationHelper(CreateProductDto, req.body);

        const product = await service.createProduct( productDto );

        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        next(error);
    }
}

export async function editProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    let productId: undefined | ObjectId;

    try {
        productId = ObjectID(req.params.productId);

        const productDto: EditProductDto = await validationHelper(EditProductDto, req.body);

        const product = await service.editProduct(productId, productDto );

        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        next(error);
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
