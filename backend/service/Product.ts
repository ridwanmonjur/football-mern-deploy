import { ObjectId } from "mongoose";
import { ProductInterface } from "../models/Product";
import { ProductRepository } from "../repository/Product";
import { CreateProductDto } from "../dto/product";
import { UserInterface } from "../models/User";

// All Business logic will be here

export class ProductService {
    repository: ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }

    async getProductById(userId: ObjectId): Promise<ProductInterface> {
        try {
            return await this.repository.findById(userId);
        } catch (err) {
            throw err;
        }
    }

    async getAllProducts(where?: any): Promise<PaginateResult<ProductInterface>> {
        where ??= {}
        try {
            return await this.repository.find(where);
        } catch (err) {
            throw err;
        }
    }

    async findOneProduct(body: any, select?: any): Promise<ProductInterface> {
        try {
            return select ? await this.repository.findOne(body, select) : await this.repository.findOne(body) ;
        } catch (err) {
            throw err;
        }
    }

    async createProduct(productDto: CreateProductDto): Promise<ProductInterface> {

        try {

            const product = await this.repository.createOne(productDto);

            return product;
        } catch (err) {
            throw err;
        }
    }

    async editProduct(id: ObjectId, productDto: CreateProductDto): Promise<ProductInterface> {

        try {

            const product = await this.repository.findByIdAndUpdate(id, productDto);

            return product;
        } catch (err) {
            throw err;
        }
    }


    async deleteProducts(ids: Array<string>) {
        try {
            await this.repository.deleteProducts(ids);
        } catch (err) {
            throw err;
        }
    }

}

