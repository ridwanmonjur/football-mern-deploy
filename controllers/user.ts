import { Request, Response, NextFunction } from 'express';
var jwt = require('jsonwebtoken');
const ObjectID = require("mongodb").ObjectID;
const { hash, compare } = require("bcrypt");
import { User, UserInterface } from "../models/User";    // need to specify the object imported from the module to use it later
import { Cart } from '../models/Cart';
import { winstonLogger } from '../winston/logger';
import { APIError, HTTP401UnauthorizedError, HTTP404NotFoundError } from '../exceptions/AppError';
import { ObjectId } from 'mongoose';
import { UserService } from '../service/Auth';
let JWT_SECRET = process.env.JWT_SECRET;
import { plainToClass } from 'class-transformer';
import { EditUserProfileInput } from '../inputs/user';
import { validate } from 'class-validator';
import { validateAndThrowError } from '../helper/validateAndThrowError';

// just deal with request and response object here

const service = new UserService();

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;
    let user: undefined | UserInterface;
    try {
        userId = ObjectID(req.params.userId);
        user = await service.getUserById(userId);
        res.json({ success: true, user });
    }
    catch (error) {
        if (!userId) throw new APIError("UserId must be string");
        else next(error);
    }
}

export async function getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;
    let user: undefined | UserInterface;
    try {
        userId = ObjectID(req.user);
        user = await service.getUserById(userId);
        res.json({ success: true, user });
    }
    catch (error) {
        if (!userId) throw new APIError("Current user is missing in the request header.");
        else next(error);
    }
}

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    let user: undefined | Array<UserInterface>;
    try {
        user = await service.getAllUsers();
        res.json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
}

export async function editCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {

    let userId: undefined | ObjectId;
    let user: UserInterface | null = null;
    const editInputs = plainToClass(EditUserProfileInput, req.body);
    const validationError = await validate(editInputs, { validationError: { target: true } });
    validateAndThrowError(validationError);
    try {
        userId = ObjectID(req.user);
        user = await service.findByIdAndUpdate(userId, {
            ...editInputs
        }) 
        res.json({ success: true, user, userId: req.user, number: 0 });
    }
    catch (error) {
        if (!userId) throw new APIError("Current user is missing in the request header.");
        else next(error);
    }
}


export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {

    const saltRounds: number = 10;

    let { name, email, password }: { name: string; email: string; password: string; } = req.body;

    winstonLogger.info(JSON.stringify(req.body));

    // promise can be awaited !!!
    let hashedPassword = await hash(password, saltRounds);
    let user = new User({ name, email, password: hashedPassword, role: "buyer" });
    let cart = new Cart({ user: user._id, });
    await user.save();
    await cart.save();
    res.json({ user, success: true });

}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {

    let { email, password }: { email: string; password: string; } = req.body;

    // .select("+password") gets field select= false
    let user = await User.findOne({ email }).select("+password");

    winstonLogger.info(JSON.stringify(user));

    if (user) {

        let match = false;
        match = await compare(password, user.password);

        if (match) {
            winstonLogger.info('success');
            user._id = user._id.toString();
            var token = jwt.sign({ "user": user._id, "role": user.role }, JWT_SECRET);
            winstonLogger.info({ token });
            const options = {
                expires: new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000
                    // 30 days
                ),
                httpOnly: true
            };

            res
                .cookie('signInToken', token, options)
                .json({
                    success: true,
                    token,
                    user
                });
        }
        else {
            winstonLogger.info("started");
            setTimeout(() => res.json({ success: false, error: "Time out happened" }), 9000);
        }
    }
    else
        res.json({ success: false, error: "Password and username failed" });
}

