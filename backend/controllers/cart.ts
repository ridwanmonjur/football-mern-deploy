import { Request, Response, NextFunction } from 'express';
const ObjectID = require("mongodb").ObjectID;
import { CartInterface } from "../models/Cart";    // need to specify the object imported from the module to use it later
import { CartService } from '../service/Cart';
import { ObjectId } from 'mongoose';
import { HTTP404NotFoundError, HTTP422UnproccessableEntity } from '../exceptions/AppError';
import { StatusCodes } from 'http-status-codes';
import { DeleteCartDtos } from '../dto/cart';
import { validationHelper } from '../helper/validationHelper';
import { extractRequestQueryForPagination } from '../helper/extractRequestQueryForPagination';
import { PurchaseService } from '../service/Purchase';

const service = new CartService();
const purchaseService = new PurchaseService();

export async function getOneCart(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart: undefined | CartInterface;
    try {
        cart = await service.findOneCart({ user: req.userID, status: "active" });

        if (cart == null) throw new HTTP404NotFoundError("Cart is not found");

        res.status(StatusCodes.OK).json({ success: true, cart });
    } catch (error) {
        next(error);
    }
}

export async function getCartsOfSignedIn(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart: undefined | PaginateResult<CartInterface>;
    try {
        cart = await service.findAllCarts({ user: req.userID }, {});

        res.status(StatusCodes.OK).json({ success: true, ...cart });
    } catch (error) {
        next(error);
    }
}

export async function getAllCarts(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart: undefined | PaginateResult<CartInterface>;
    try {
        const { query, options } = extractRequestQueryForPagination(req.query)

        cart = await service.findAllCarts(query, options);

        res.status(StatusCodes.OK).json({ success: true, ...cart });
    } catch (error) {
        next(error);
    }
}

export async function addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let productId = req.params.productId;
    try {
        userId = ObjectID(req.userID);

        if (req.params.productId && req.userID) {
            let cart: CartInterface | null = await service.addToCart(req.body, userId, productId);

            res.status(StatusCodes.CREATED).json({ cart, success: true });
        }
    }
    catch (error) {
        next(error);
    }
}


export async function editProductQuantity(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let productId = req.params.productId;
    try {
        userId = ObjectID(req.userID);

        if (req.params.productId && req.userID) {

            let cart: CartInterface | null = await service.editCart(req.body, userId, productId);

            res.json({ cart, success: true });
        }
    }
    catch (error) {
        if (!userId) throw new HTTP422UnproccessableEntity("UserId cannot be converted to ObjectID");

        next(error);
    }
}


export async function deleteCartProduct(req: Request, res: Response, next: NextFunction): Promise<void> {

    let userId: undefined | ObjectId;

    let deleteProductIndex: number | undefined;

    console.log({ deleteProductIndex, userId })

    try {
        deleteProductIndex = parseInt(req.params.deleteProductIndex);

        userId = ObjectID(req.userID);

        console.log({ deleteProductIndex, userId })

        let index = await service.deleteCartProduct(userId, deleteProductIndex);

        console.log({ deleteProductIndex, userId, index })

        res.status(StatusCodes.OK).json({ success: true, index });
    }
    catch (error) {
        if (!userId) throw new HTTP422UnproccessableEntity("UserId cannot be converted to ObjectID");

        if (!deleteProductIndex) throw new HTTP422UnproccessableEntity("Product index cannot be converted to integer");

        next(error);
    }
}


export async function payCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    try {
        userId = ObjectID(req.userID);

        let oldCart = await service.findOneCart({ user: req.userID, status: "active" });

        if (oldCart == null) {
            let cart = await service.payCart(userId, req.body.checkout);

            let purchase = await purchaseService.payPurchase(userId, req.body.purchase);

            res.status(StatusCodes.CREATED).json({ success: true, cart, purchase });
        }
        else {
            throw new HTTP422UnproccessableEntity("Cart is already created");
        }
    }
    catch (error) {
        if (!userId) throw new HTTP422UnproccessableEntity("UserId must be string");

        else next(error);
    }
}
export async function deleteCarts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log({ hit: true })

        await validationHelper(DeleteCartDtos, req.body)

        await service.deleteCarts(req.body.ids);

        res.status(StatusCodes.NO_CONTENT).json({})
    }
    catch (error) {
        next(error);
    }
}
