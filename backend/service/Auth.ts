import { HTTP401UnauthorizedError, HTTP403ForbiddenError, HTTP404NotFoundError } from "../exceptions/AppError";
import { UserLoginDto } from "../dto/user";
import { UserInterface } from "../models/User";
import { CartRepository } from "../repository/Cart";
import { UserRepository } from "../repository/User";
const { compare } = require("bcrypt");
let JWT_SECRET = process.env.JWT_SECRET;
var jwt = require('jsonwebtoken');

// All Business logic will be here

interface IVerifyUserOutput {
    user: UserInterface;
    accessToken: string;
}
export class AuthService {

    repository: UserRepository;

    cartReposity: CartRepository;
    constructor() {
        this.repository = new UserRepository();
    }


    async verifyUser(loginDtos: UserLoginDto): Promise<IVerifyUserOutput> {
        const select = "+password";

        try {
            const { email, password } = loginDtos;

            let user = await this.findOneUser({ email }, select);

            if (!user) throw new HTTP401UnauthorizedError("Cannot find the user's email.");

            const match = await compare(password, user.password);

            if (!match) throw new HTTP401UnauthorizedError("Wrong password entered.");

            user._id = user._id.toString();

            const accessToken = jwt.sign({ "userID": user._id, "role": user.role }, JWT_SECRET, {
                expiresIn: '1d'
            });

            return { user, accessToken };

        } catch (err) {
            throw err;
        }
    }

    async verifyRefeshToken(accessToken: string): Promise<string> {

        try {
            let user = await this.findOneUser({ token: { accessJWT: accessToken } });

            if (!user) throw new HTTP403ForbiddenError("Cannot find the user's email.");

            try {
                const decoded = jwt.verify(accessToken, JWT_SECRET);

                let { userID: userIDDecoded, role } = decoded;

                if (userIDDecoded === user._id && role === user.role) {

                    const accessToken = jwt.sign({ userID: user }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '10m',
                    });

                    return accessToken
                }

                if (!user) throw new HTTP403ForbiddenError("Unkown user found in JWT.");

            }
            catch (error) {
                throw new HTTP403ForbiddenError(error.message || "Failed to find token");
            }

        } catch (err) {
            throw err;
        }   
    }

    public async findOneUser(body: any, select?: any): Promise<UserInterface> {
        try {
            return await this.repository.findOne(body, select);
        } catch (err) {
            throw err;
        }
    }
}

