import { Request, Response, NextFunction } from 'express';
const ObjectID = require("mongodb").ObjectID;
import { CartInterface } from "../models/Cart";    // need to specify the object imported from the module to use it later
import { CartService } from '../service/Cart';
import { ObjectId } from 'mongoose';
import { HTTP422UnproccessableEntity } from '../exceptions/AppError';
import { StatusCodes } from 'http-status-codes';

const service = new CartService();

export async function getCart(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart: undefined | CartInterface;
    try {
        cart = await service.findOneCart({ user: req.user, status: "active" });

        res.status(StatusCodes.OK).json({ success: true, cart });
    } catch (error) {
        next(error);
    }
}

export async function getCarts(req: Request, res: Response, next: NextFunction): Promise<void> {

    let cart: undefined | Array<CartInterface>;
    try {
        cart = await service.findAllCarts({ user: req.user });

        res.status(StatusCodes.OK).json({ success: true, cart });
    } catch (error) {
        next(error);
    }
}

export async function addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let productId = req.params.productId;
    try {
        userId = ObjectID(req.user);

        if (req.params.productId && req.user) {
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
        userId = ObjectID(req.user);

        if (req.params.productId && req.user) {

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

        userId = ObjectID(req.user);

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


export async function getNewCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    try {
        userId = ObjectID(req.user);

        let cart = await service.createCart(userId);

        res.status(StatusCodes.CREATED).json({ success: true, cart });
    }
    catch (error) {
        if (!userId) throw new HTTP422UnproccessableEntity("UserId must be string");

        else next(error);
    }

}
