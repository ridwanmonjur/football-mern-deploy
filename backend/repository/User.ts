import { ObjectId } from "mongoose";
import { HTTP500InternalServerrror } from "../exceptions/AppError";
import { EditUserProfileDto } from "../dto/user";
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

    async find(where?: any): Promise<Array<UserInterface>> {
        try {
            return await User.find(where);
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query all users");
        }
    }

    async findOne(where: any, select: any): Promise<UserInterface> {
        try {
            console.log({where, select})
            return await User.findOne({ ...where }).select(select);
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query user by body");
        }
    }

    async createOne(body: any): Promise<UserInterface> {
        try {
            let user = new User({ ...body });

            await user.save();

            return user;
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to create user.");
        }
    }

    async findByIdAndUpdate(userId: ObjectId, body: EditUserProfileDto): Promise<UserInterface> {
        try {
            return await User.findByIdAndUpdate(userId, { ...body }, { new: true });
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update user with the body");
        }
    }

    async deleteUsers(ids: Array<string>) {
        try {
            await User.deleteMany({_id: { $in: ids}});
        }
        catch(error) {
            throw error;
        }
    }

}

