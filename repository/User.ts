import { ObjectId } from "mongoose";
import { HTTP500InternalServerrror } from "../exceptions/AppError";
import { User, UserInterface } from "../models/User";    // need to specify the object imported from the module to use it later

export class UserRepository {

    async findById(userId: ObjectId): Promise<UserInterface> {
        try {
            return await User.findById(userId);
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query user by ID");
        }
    }

    async find(): Promise<Array<UserInterface>> {
        try {
            return await User.find({});
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query all users");
        }
    }

    async findByIdAndUpdate(userId: ObjectId, body: any): Promise<UserInterface> {
        try {
            return await User.findByIdAndUpdate(userId, { ...body }, { new: true });
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update user with the body");
        }
    }


}

