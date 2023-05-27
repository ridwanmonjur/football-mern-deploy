import { ObjectId } from "mongoose";
import { CreateUserDto, EditUserProfileDto, } from "../dto/user";
import { Cart, CartInterface } from "../models/Cart";
import { UserInterface } from "../models/User";
import { CartRepository } from "../repository/Cart";
import { UserRepository } from "../repository/User";
const { hash, } = require("bcrypt");

// All Business logic will be here


interface ISignupUserOutput {
    user: UserInterface;
    cart: CartInterface;
}

export class UserService {
    repository: UserRepository;

    cartReposity: CartRepository;
    constructor() {
        this.repository = new UserRepository();

        this.cartReposity = new CartRepository();
    }

    async getUserById(userId: ObjectId): Promise<UserInterface> {
        try {
            return await this.repository.findById(userId);
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers(where?: any): Promise<PaginateResult<UserInterface>> {
        where ??= {}
        try {
            return await this.repository.find(where);
        } catch (err) {
            throw err;
        }
    }

    async findByIdAndUpdate(userId: ObjectId, editDtos: EditUserProfileDto): Promise<UserInterface> {
        try {
            return await this.repository.findByIdAndUpdate(userId, editDtos);
        } catch (err) {
            throw err;
        }
    }

    async signupUser(signupDtos: CreateUserDto): Promise<ISignupUserOutput> {
        const saltRounds: number = 10;

        try {

            let { name, email, password, role } = signupDtos;

            let hashedPassword = await hash(password, saltRounds);

            let user = await this.repository.createOne({ name, email, password: hashedPassword, role });

            let cart = await this.cartReposity.createOne({ user: user._id, });

            return { cart, user };
        } catch (err) {
            throw err;
        }
    }

    async deleteUsers(ids: Array<string>) {
        try {
            await this.repository.deleteUsers(ids);
        } catch (err) {
            throw err;
        }
    }
}

