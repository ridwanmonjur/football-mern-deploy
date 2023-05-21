import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { UserLoginDto } from '../dto/user';
import { validate } from 'class-validator';
import { validateAndThrowError } from '../helper/validateAndThrowError';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../service/Auth';
import { validationOptions } from '../helper/validatorOptions';

// controller: just deal with request and response object 

const service = new AuthService();

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const loginDtos = plainToClass(UserLoginDto, req.body);

        const validationError = await validate(loginDtos, validationOptions);

        validateAndThrowError(validationError);

        const { user, accessToken: token, refreshToken } = await service.verifyUser(loginDtos);

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),// 30 days
            httpOnly: true
        };

        res.status(StatusCodes.OK)
        .cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, options)
        .json({ success: true, token, user });
    }
    catch (error) {
        next(error);
    }
}


export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME];

        if (!refreshToken) return res.status(StatusCodes.NO_CONTENT).json({ success: true});
        
        const { userID } = req;
        try {
            const user = await service.findOneUser({ _id: userID });
            
            user.token.refreshToken = null;

            await user.save();
        }
        finally {
            res.clearCookie(process.env.WEB_COOKIE_REFRESH_TOKEN);
            return res.status(StatusCodes.OK).json({ message: "Logout Successfully!" });
        }
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies[process.env.WEB_COOKIE_REFRESH_TOKEN];

        if (!refreshToken) return res.status(StatusCodes.FORBIDDEN).json({ error: "Not logged in at all!" });

        const accessToken = await service.verifyRefeshToken(refreshToken)

        res.status(StatusCodes.OK).json({ success: true, accessToken })
    } catch (error) {
        next(error)
    }
}

