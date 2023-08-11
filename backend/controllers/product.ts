import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongoose';
import { HTTP404NotFoundError, HTTP422UnproccessableEntity, HTTP500InternalServerrror } from '../exceptions/AppError';
import { ProductInterface } from '../models/Product';
import { ProductService } from '../service/Product';
import { CreateProductDto, DeleteProductDtos, EditProductDto, ProductFilter } from '../dto/product';
import { validationHelper } from '../helper/validationHelper';
import { extractRequestQueryForPagination } from '../helper/extractRequestQueryForPagination';
const ObjectID = require("mongodb").ObjectID;

const service = new ProductService();

export async function getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { query, options } = extractRequestQueryForPagination(req.query)
        const product = await service.getAllProducts(query, options) as PaginateResult<ProductInterface>;
        if (product == null) throw new HTTP404NotFoundError("Product is not found");
        res.status(StatusCodes.OK).json({ success: true, ...product });
    }
    catch (err) {
        next(err);
    }
}

export async function getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    let productId: undefined | ObjectId;
    try {
        productId = ObjectID(req.params.productId);
        const {product, users} = await service.getProductById(productId);
        if (product == null) throw new HTTP404NotFoundError("Product is not found");
        res.status(StatusCodes.OK).json({ success: true, product, users });
    }
    catch (error) {
        if (!productId) throw new HTTP422UnproccessableEntity("UserId must be string");
        else next(error);
    }
}

export async function getProductBytType(req: Request, res: Response, next: NextFunction): Promise<void> {
    let type: undefined | string;
    try {
        type = req.params.productType;
        const product = await service.getAllProducts({ type }) as PaginateResult<ProductInterface>;
        if (product == null) throw new HTTP404NotFoundError("Products are not found");
        res.status(StatusCodes.OK).json({ success: true, ...product });
    }
    catch (error) {
        if (!type) throw new HTTP422UnproccessableEntity("Type of product must be passed in request parameter correctly.");
        else next(error);
    }
}

export async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        if (req.body.seller == undefined && req.role == "seller") req.body.seller = req.userID
        if (req.file == undefined) {
            throw new HTTP422UnproccessableEntity("Product image is missing!")
        }
        else {
            if (req.file.path == undefined) throw new HTTP500InternalServerrror("Couldn't get file path after saving!")
            req.body.image = req.file.path;
        }
        const productDto: CreateProductDto = await validationHelper(CreateProductDto, req.body);
        const product = await service.createProduct(productDto);
        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        next(error);
    }
}

export async function editProduct(req: Request, res: Response, next: NextFunction): Promise<void> {

    let productId: undefined | ObjectId;

    try {
        if (req.body.seller == undefined && req.role == "seller") req.body.seller = req.userID
        productId = ObjectID(req.params.productId);
        const {product: productSearch} = await service.getProductById(productId);
        if (productSearch == null) throw new HTTP404NotFoundError("Product is not found");

        if (req.file == undefined) {
            req.body.image = productSearch?.image;
        }
        else {
            if (req.file.path == undefined) throw new HTTP500InternalServerrror("Couldn't get file path after saving!")
            req.body.image = req.file.path;
        }
        const productDto: EditProductDto = await validationHelper(EditProductDto, req.body);
        const product = await service.editProduct(productId, productDto);
        res.status(StatusCodes.OK).json({ success: true, product });
    }
    catch (error) {
        next(error);
    }
}

export async function deleteProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await validationHelper(DeleteProductDtos, req.body)
        await service.deleteProducts(req.body.ids);
        res.status(StatusCodes.NO_CONTENT).json({})
    }
    catch (error) {
        next(error);
    }

}

export async function editComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    let productId: undefined | ObjectId;
    let commentId: undefined | ObjectId;
    try {
        productId = ObjectID(req.params.productId);
        commentId = ObjectID(req.params.commentId);
        const comment = await service.editComment(productId, commentId, req.body.commentBody);
        res.status(StatusCodes.OK).json({ success: true, comment });
    }
    catch (error) {
        next(error);
    }
}

export async function createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    let productId: undefined | ObjectId;
    try {
        productId = ObjectID(req.params.productId);
        const comment = await service.createComment(productId, req.body);
        res.status(StatusCodes.OK).json({ success: true, comment });
    }
    catch (error) {
        next(error);
    }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    let productId: undefined | ObjectId;
    let commentId: undefined | ObjectId;
    try {
        productId = ObjectID(req.params.productId);
        commentId = ObjectID(req.params.commentId);
        const comment = await service.deleteComment(productId, commentId);
        res.status(StatusCodes.OK).json({ success: true, comment });
    }
    catch (error) {
        next(error);
    }
}