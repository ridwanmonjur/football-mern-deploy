import { ObjectId } from "mongoose";
import { HTTP500InternalServerrror } from "../exceptions/AppError";
import { EditUserProfileInput } from "../inputs/user";
import { Cart, CartInterface } from "../models/Cart";
import { User, UserInterface } from "../models/User";    // need to specify the object imported from the module to use it later

export class CartRepository {

    // async findById(userId: ObjectId): Promise<UserInterface> {
    //     try {
    //         return await User.findById(userId);
    //     }
    //     catch {
    //         throw new HTTP500InternalServerrror("Unable to query user by ID");
    //     }
    // }

    // async find(): Promise<Array<UserInterface>> {
    //     try {
    //         return await User.find({});
    //     }
    //     catch {
    //         throw new HTTP500InternalServerrror("Unable to query all users");
    //     }
    // }

    // async findOne(body: any, select: any): Promise<UserInterface> {
    //     try {
    //         console.log({body, select})
    //         return await User.findOne({ ...body }).select(select);
    //     }
    //     catch {
    //         throw new HTTP500InternalServerrror("Unable to query user by body");
    //     }
    // }

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


}

