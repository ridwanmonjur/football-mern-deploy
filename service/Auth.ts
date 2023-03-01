import { ObjectId } from "mongoose";
import { EditUserProfileInput } from "../inputs/user";
import { UserInterface } from "../models/User";
import { UserRepository } from "../repository/User";

// All Business logic will be here
export class UserService {

    repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async getUserById(userId: ObjectId): Promise<UserInterface> {
        try {
            return await this.repository.findById(userId);
        } catch (err) {
            throw err
        }
    }

    async getAllUsers(): Promise<Array<UserInterface>> {
        try {
            return await this.repository.find();
        } catch (err) {
            throw err
        }
    }

    async findByIdAndUpdate(userId: ObjectId, editInputs: EditUserProfileInput): Promise<UserInterface> {
        try {
            return await this.repository.findByIdAndUpdate(userId, editInputs);
        } catch (err) {
            throw err
        }
    }

}

