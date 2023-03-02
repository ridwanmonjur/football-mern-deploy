import { ObjectId } from "mongoose";
import { HTTP500InternalServerrror } from "../exceptions/AppError";
import { Cart, CartInterface } from "../models/Cart";

export class CartRepository {


    async findOne(where: any, populate?: Array<string>): Promise<CartInterface> {

        try {
            if (populate) {
                const [_, __] = populate;

                return await Cart.findOne({ ...where }).populate(_, __);
            }
            else {
                return await Cart.findOne({ ...where })
            }
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query user by body");
        }
    }

    async find(populate: Array<string>): Promise<Array<CartInterface>> {
        const [_, __] = populate;
        try {
            return await Cart.find({}).populate(_, __);
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query user by body");
        }
    }

    async createOne(body: any): Promise<CartInterface> {
        try {
            let cart = new Cart({ ...body });

            await cart.save();

            return cart;
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to create cart ");
        }
    }

    async updateOne(where: any, body: any): Promise<void> {
        try {
            await Cart.updateOne(
                { ...where },
                { ...body }
            );
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update carts");
        }
    }

    async updateMany(where: any, body: any): Promise<void> {
        try {
            await Cart.updateMany(
                { ...where },
                { ...body }
            );
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update carts");
        }
    }




}


