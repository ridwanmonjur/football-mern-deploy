const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { APIError, HTTP401UnauthorizedError } from '../exceptions/AppError';

let JWT_SECRET = process.env.JWT_SECRET;

const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    console.log({token});
    if (!token)     // Check for token
        throw new HTTP401UnauthorizedError(); // return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);  // Verify token
        let { user, role } = decoded;  // Add user from payload
        req.user = user;
        req.role = role;
        next();
    } catch (e) {
        throw new APIError('Token is not valid', StatusCodes.BAD_REQUEST);
    }
};

const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.role)) {
            throw new APIError('Token is not valid', StatusCodes.BAD_REQUEST);
        }

        else {
            next();
        }
    };
};

export { authorize, protect };