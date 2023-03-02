import { ObjectId } from "mongoose";
import { HTTP500InternalServerrror } from "../exceptions/AppError";
import { Product, ProductInterface } from "../models/Product";    // need to specify the object imported from the module to use it later

export class ProductRepository {

    async findById(productId: ObjectId): Promise<ProductInterface> {
        try {
            return await Product.findById(productId);
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query product by ID");
        }
    }

    async find(): Promise<Array<ProductInterface>> {
        try {
            let product = await Product.find({});

            return product;
        }
        catch (error) {
            

            throw new HTTP500InternalServerrror("Unable to query all products");
        }
    }

    async findOne(where: any, select?: any): Promise<ProductInterface> {
        try {
            return select ? await Product.findOne({ ...where }).select(select) : await Product.findOne({ ...where });
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query product by body");
        }
    }

    async findByIdAndUpdate(productId: string | ObjectId, body: any): Promise<ProductInterface> {
        try {
            return await Product.findByIdAndUpdate(productId, { ...body });
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query product by body");
        }
    }



}

