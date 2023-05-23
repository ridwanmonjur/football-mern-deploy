import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { APIError } from '../exceptions/AppError';

const authorize = (...roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!roles.includes(req.role)) {
            throw new APIError('Token is not valid', StatusCodes.FORBIDDEN);
        }
        else {
            next();
        }
    };
};

export { authorize };