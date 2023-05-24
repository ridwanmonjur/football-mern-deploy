import { Request, Response, NextFunction } from 'express';
import { UserLoginDto } from '../dto/user';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../service/Auth';
import { validationHelper } from '../helper/validationHelper';
// controller: just deal with request and response object 

const service = new AuthService();

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const loginDtos: UserLoginDto = await validationHelper(UserLoginDto, req.body);
        const { user, accessToken: token } = await service.verifyUser(loginDtos);

        res.status(StatusCodes.OK)
            .json({ success: true, token, user });
    }
    catch (error) {
        next(error);
    }
}


