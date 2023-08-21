import { ObjectId } from "mongoose";
import { HTTP500InternalServerrror } from "../exceptions/AppError";
import { Purchase, PurchaseInterface } from "../models/Purchase";

export class PurchaseRepository {

    async findOne(where: any, populate?: Array<string>, sort?: any): Promise<PurchaseInterface> {
        sort??= { 'created_at' : -1 }

        try {
            if (populate) {
                const [_, __] = populate;

                return await Purchase.findOne({ ...where }).sort(sort).populate(_, __);
            }
            else {
                return await Purchase.findOne({ ...where }).sort(sort);
            }
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query user by body");
        }
    }

    async find(query?: any, options?: any, sort?: any): Promise<PaginateResult<PurchaseInterface>> {
        sort??= { 'created_at' : -1 }

        try {

            if (options?.populate == undefined) options.populate = [
                {
                    path: 'products',
                    select: 'name image price type'
                },
                {
                    path: 'user',
                    select: 'name email'
                }]
            options.sort = sort;
            return await Purchase.paginate(query, options)

        }
        catch(error) {
            console.log({error})
            throw error;
        }
    }

    async createOne(body: any): Promise<PurchaseInterface> {
        try {
            let purchase = new Purchase({ ...body });

            await purchase.save();

            return purchase;
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to create purchase ");
        }
    }

    async updateOne(where: any, body: any): Promise<void> {
        try {
            console.log({ where, body })
            let z = await Purchase.updateOne(
                { ...where },
                { ...body }
            );
            console.log({ z, where, body })
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update purchases");
        }
    }

    async updateMany(where: any, body: any): Promise<void> {
        try {
            await Purchase.updateMany(
                { ...where },
                { ...body }
            );
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update purchases");
        }
    }

    async deletePurchases(ids: Array<string>): Promise<void> {
        try {
            console.log({ ids })

            const purchases = await Purchase.deleteMany({ _id: { $in: ids } });

            console.log({ ids, purchases })
        }
        catch (error) {

            console.log({ error })

            throw new HTTP500InternalServerrror("Unable to update purchases");
        }
    }


}


