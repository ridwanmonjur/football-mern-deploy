import { ObjectId } from "mongoose";
import { HTTP401UnauthorizedError } from "../exceptions/AppError";
import { CreateUserInput, EditUserProfileInput, UserLoginInput } from "../inputs/user";
import { Cart, CartInterface } from "../models/Cart";
import { UserInterface } from "../models/User";
import { CartRepository } from "../repository/Cart";
import { UserRepository } from "../repository/User";
const { hash, compare } = require("bcrypt");
let JWT_SECRET = process.env.JWT_SECRET;
var jwt = require('jsonwebtoken');

// All Business logic will be here

interface IVerifyUserOutput {
    user: UserInterface;

    token: string;
}

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

    async getAllUsers(): Promise<Array<UserInterface>> {
        try {
            return await this.repository.find();
        } catch (err) {
            throw err;
        }
    }

    async findByIdAndUpdate(userId: ObjectId, editInputs: EditUserProfileInput): Promise<UserInterface> {
        try {
            return await this.repository.findByIdAndUpdate(userId, editInputs);
        } catch (err) {
            throw err;
        }
    }

    async signupUser(signupInputs: CreateUserInput): Promise<ISignupUserOutput> {
        const saltRounds: number = 10;

        try {

            let { name, email, password } = signupInputs;

            let hashedPassword = await hash(password, saltRounds);


            let user = await this.repository.createOne({ name, email, password: hashedPassword, role: "buyer" });

            let cart = await this.cartReposity.createOne({ user: user._id, });

            return { cart, user };
        } catch (err) {
            throw err;
        }
    }


    async verifyUser(loginInputs: UserLoginInput): Promise<IVerifyUserOutput> {
        const select = "+password";

        try {
            const { email, password } = loginInputs;

            let user = await this.findOneUser({ email }, select);

            if (!user) throw new HTTP401UnauthorizedError("Cannot find the user's email.");

            const match = await compare(password, user.password);

            if (!match) throw new HTTP401UnauthorizedError("Wrong password entered.");

            user._id = user._id.toString();

            const token = jwt.sign({ "user": user._id, "role": user.role }, JWT_SECRET);

            return { user, token };

        } catch (err) {
            throw err;
        }
    }

    private async findOneUser(body: any, select: any): Promise<UserInterface> {
        try {
            return await this.repository.findOne(body, select);
        } catch (err) {
            throw err;
        }
    }

}

