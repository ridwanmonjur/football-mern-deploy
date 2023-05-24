const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { APIError, HTTP401UnauthorizedError } from '../exceptions/AppError';

let JWT_SECRET = process.env.JWT_SECRET;

const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    if (!token || String(token).trim() === "")     // Check for token
        throw new HTTP401UnauthorizedError(); // return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);  // Verify token
        let { userID, role } = decoded;  // Add userID from payload
        req.userID = userID;
        req.role = role;
        next();
    } catch (e) {
        throw new APIError('Token is not valid', StatusCodes.UNAUTHORIZED);
    }
};



export { protect };