var jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';

let JWT_SECRET = 'secret'

const protect= (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');

    // Check for token
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Add user from payload
        let {user, role} = decoded
        req.user = user;
        req.role = role;
        next();
    } catch (e) {
        res.status(400).json({ success: false, msg: 'Token is not valid' });
    }
};

const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.role)) {
            res.status(400).json({ success: false, msg: 'Token is not valid' })
        }
        else {
            next();
        }
    };
};

export {authorize, protect}