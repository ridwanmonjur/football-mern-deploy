import { Request, Response, NextFunction } from 'express';
const ObjectID = require("mongodb").ObjectID;
import { UserInterface } from "../models/User";    // need to specify the object imported from the module to use it later
import { HTTP422UnproccessableEntity } from '../exceptions/AppError';
import { ObjectId } from 'mongoose';
import { UserService } from '../service/User';
import { CreateUserDto, DeleteUserDtos, EditUserProfileDto, UserLoginDto } from '../dto/user';
import { StatusCodes } from 'http-status-codes';
import { validationHelper } from '../helper/validationHelper';

// controller: just deal with request and response object 

const service = new UserService();

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let user: undefined | UserInterface;
    try {
        userId = ObjectID(req.params.userId);

        user = await service.getUserById(userId);

        res.status(StatusCodes.OK).json({ success: true, user });
    }
    catch (error) {
        if (!userId) throw new HTTP422UnproccessableEntity("UserId must be string");

        else next(error);
    }
}

export async function getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let user: undefined | UserInterface;
    try {
        userId = ObjectID(req.userID);

        user = await service.getUserById(userId);

        res.status(StatusCodes.OK).json({ success: true, user });
    }
    catch (error) {
        if (!userId) throw new HTTP422UnproccessableEntity("Current user is missing in the request header.");

        else next(error);
    }
}

export async function getUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    let user: undefined | Array<UserInterface>;
    try {
        user = await service.getAllUsers();

        res.status(StatusCodes.OK).json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
}

export async function editCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let user: UserInterface | null = null;

    const editDtos: EditUserProfileDto = await validationHelper(EditUserProfileDto, req.body);

    try {
        userId = ObjectID(req.userID);

        user = await service.findByIdAndUpdate(userId, { ...editDtos });

        res.status(StatusCodes.CREATED).json({ success: true, user, userId: req.userID, number: 0 });
    }
    catch (error) {
        console.log({ error: error.message })
        if (!userId) throw new HTTP422UnproccessableEntity("Current user is missing in the request header.");

        else next(error);
    }
}


export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const signupDtos: CreateUserDto = await validationHelper(CreateUserDto, req.body);

        if (signupDtos.password!== signupDtos.confirmPassword) {
            throw new HTTP422UnproccessableEntity("Password and confirmed password must match!")
        }

        const { user, cart } = await service.signupUser(signupDtos);

        res.status(StatusCodes.CREATED).json({ user, cart, success: true });
    }
    catch (error) {
        next(error);
    }
}

export async function deleteUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await validationHelper(DeleteUserDtos, req.body);

        await service.deleteUsers(req.body.ids);

        res.status(StatusCodes.NO_CONTENT).json({})
    }
    catch (error) {
        next(error);
    }
}