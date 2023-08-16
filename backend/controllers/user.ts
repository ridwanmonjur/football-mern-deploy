import { Request, Response, NextFunction } from 'express';
const ObjectID = require("mongodb").ObjectID;
import { UserInterface } from "../models/User";    // need to specify the object imported from the module to use it later
import { HTTP404NotFoundError, HTTP422UnproccessableEntity, HTTP500InternalServerrror } from '../exceptions/AppError';
import { ObjectId } from 'mongoose';
import { UserService } from '../service/User';
import { CreateUserDto, DeleteUserDtos, EditUserProfileDto, UserLoginDto } from '../dto/user';
import { StatusCodes } from 'http-status-codes';
import { validationHelper } from '../helper/validationHelper';
import { extractRequestQueryForPagination } from '../helper/extractRequestQueryForPagination';

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

        if (user == null) throw new HTTP422UnproccessableEntity("Current user is missing in the request header.");

        res.status(StatusCodes.OK).json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
}

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    let user: undefined | PaginateResult<UserInterface>;
    try {
        const { query, options } = extractRequestQueryForPagination(req.query)

        user = await service.getAllUsers(query, options);

        if (user == null) throw new HTTP404NotFoundError("Can't find users");

        res.status(StatusCodes.OK).json({ success: true, ...user });
    }
    catch (error) {
        next(error);
    }
}

export async function editCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let user: UserInterface | null;
    try {
        userId = ObjectID(req.userID);

        const userSearch = await service.getUserById(userId);

        ['token', 'address', 'creditCard'].forEach((value) => {
            if (value in req.body) req.body[value] = JSON.parse(req.body[value])
        })

        if (userSearch == null) throw new HTTP404NotFoundError("User is not found");

        if (req.file == undefined) {
            if (userSearch?.image != undefined) req.body.image = userSearch?.image;
            delete req.body.image;
        }
        else {
            if (!('path' in req.file)) throw new HTTP500InternalServerrror("Couldn't get file path after saving!")
            req.body.image = req.file.path;
        }

        const editDtos: EditUserProfileDto = await validationHelper(EditUserProfileDto, req.body);

        // console.log({ userSearch: userSearch.image, req: req.body.image, editDtos: editDtos.image, file: req.file.path })

        user = await service.findByIdAndUpdate(userId, { ...editDtos });

        if (user == null) throw new HTTP404NotFoundError("Can't find users");

        res.status(StatusCodes.CREATED).json({ success: true, user, userId: req.userID, number: 0 });
    }
    catch (error) {
        console.log({ error: error.message })
        if (!userId) throw new HTTP422UnproccessableEntity("Current user is missing in the request header.");

        else next(error);
    }
}

export async function editUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userId: undefined | ObjectId;

    let user: UserInterface | null;

    try {
        console.log({ started: true });

        userId = ObjectID(req.params.userId);

        const userSearch = await service.getUserById(userId);

        if (userSearch == null) throw new HTTP404NotFoundError("User is not found");

        ['token', 'address', 'creditCard'].forEach((value) => {
            console.log({value})
            if (value in req.body) req.body[value] = JSON.parse(req.body[value])
            console.log({value})

        })

        console.log({ started: true });

        if (req.file == undefined) {
            if (userSearch?.image != undefined) req.body.image = userSearch?.image;
            delete req.body.image;
        }
        else {
            if (req.file.path == undefined) throw new HTTP500InternalServerrror("Couldn't get file path after saving!")
            req.body.image = req.file.path;
        }

        console.log({ userSearch, body: req.body })

        const editDtos: EditUserProfileDto = await validationHelper(EditUserProfileDto, req.body);

        user = await service.findByIdAndUpdate(userId, { ...editDtos });

        if (user == null) throw new HTTP404NotFoundError("Can't find users");

        res.status(StatusCodes.CREATED).json({ success: true, user, userId: req.userID, number: 0 });
    }
    catch (error) {
        if (userId == null) throw new HTTP422UnproccessableEntity("Current user is missing in the request header.");

        else next(error);
    }
}

export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        ['token', 'address', 'creditCard'].forEach((value) => {
            if (value in req.body) req.body[value] = JSON.parse(value) 
        })

        if (req.file == undefined) {
            delete req.body.image;
        }
        else {
            if (req.file.path == undefined) throw new HTTP500InternalServerrror("Couldn't get file path after saving!")
            req.body.image = req.file.path;
        }

        const signupDtos: CreateUserDto = await validationHelper(CreateUserDto, req.body);

        console.log({ signupDtos })

        const { user, cart } = await service.signupUser(signupDtos);

        if (signupDtos.password !== signupDtos.confirmPassword) {
            throw new HTTP422UnproccessableEntity("Password and confirmed password must match!")
        }

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