import { ObjectId } from "mongoose";
import { HTTP404NotFoundError } from "../exceptions/AppError";
import { PurchaseInterface } from "../models/Purchase";
import { PurchaseRepository } from "../repository/Purchase";
import { ProductRepository } from "../repository/Product";

// All Business logic will be here

export class PurchaseService {
    repository: PurchaseRepository;

    productRepository: ProductRepository;
    constructor() {
        this.repository = new PurchaseRepository();

        this.productRepository = new ProductRepository();
    }

    async payPurchase(userId: ObjectId, purchase: any): Promise<PurchaseInterface> {

        const newPurchase = { user: userId, ...purchase, status: "paid", paidAt: new Date()  };

        try {
            let purchase = await this.repository.createOne(newPurchase);

            return purchase;
        }
        catch (error) {
            throw error;
        }
    }

    async deliverPurchase(userId: ObjectId): Promise<PurchaseInterface> {
        let where = { user: userId, status: "paid" };

        const body = { status: "paid", deliveredAt: new Date() };

        try {
            await this.repository.updateMany(where, body);

            const populate = ['products', 'name image price type'];

            where = { user: userId, status: "delivered" }

            const sort = { 'created_at' : -1 }

            const purchase = await this.repository.findOne(where, populate, sort);
            
            return purchase;
        }
        catch (error) {
            throw error;
        }
    }


    async findOnePurchase(where: any): Promise<PurchaseInterface> {
        const populate = ['products', 'name image price type'];
        try {
            return await this.repository.findOne(where, populate);
        } catch (err) {
            throw err;
        }
    }

    async findAllPurchases(where?: any, options?: any): Promise<PaginateResult<PurchaseInterface>> {
     
        try {
            return await this.repository.find(where, options);
        } catch (err) {
            throw err;
        }
    }

}

