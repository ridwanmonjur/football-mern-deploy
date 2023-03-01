import { ObjectId } from "mongoose";
import { HTTP401UnauthorizedError } from "../exceptions/AppError";
import { CartInterface } from "../models/Cart";
import { CartRepository } from "../repository/Cart";


// All Business logic will be here



export class CartService {
    repository: CartRepository;

    constructor() {
        this.repository = new CartRepository();

    }

    async getCartById(cartId: ObjectId): Promise<CartInterface> {
        try {
            return await this.repository.findById(cartId);
        } catch (err) {
            throw err;
        }
    }

    async getAllCarts(): Promise<Array<CartInterface>> {
        try {
            return await this.repository.find();
        } catch (err) {
            throw err;
        }
    }


    private async findOneCart(body: any, select: any): Promise<CartInterface> {
        try {
            return await this.repository.findOne(body, select);
        } catch (err) {
            throw err;
        }
    }

}

