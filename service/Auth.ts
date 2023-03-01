import { ObjectId } from "mongoose";
import { APIError } from "../exceptions/AppError";
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
            return this.repository.findById(userId);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getAllUsers(): Promise<Array<UserInterface>> {
        try {
            throw new APIError("in repository...");
            return this.repository.find();
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

}

