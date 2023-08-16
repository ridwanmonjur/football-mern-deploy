import { Product, ProductInterface } from "../models/Product";
import { ProductRepository } from "../repository/Product";
import { CreateProductDto } from "../dto/product";
import { User, UserInterface } from "../models/User";
import { isMongoId } from "class-validator";
const ObjectID = require("mongodb").ObjectID;
import { ObjectId } from 'mongoose';

// All Business logic will be here

export class ProductService {

    repository: ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }

    async getProductById(userId: ObjectId): Promise<{product: ProductInterface, users: UserInterface[]}> {
        try {
            const product = await this.repository.findById(userId);
            let _users = new Array<UserInterface>();
            product.comment.forEach((comment: any) => {
                _users.push(ObjectID(comment.userId));
            });
            let dbUsers: UserInterface[] = await User.aggregate([
                {$match: {
                    _id: { $in: _users }
                 } },
                {$project: {name: 1, image: 1, _id: 1}},
            ])  
            let userKey = {};
            dbUsers.forEach((value: any)=>{
                userKey[value?._id] = {
                    ...value
                }
            })  
            let users = _users.map((value)=> {
                return userKey[value?._id]
            })
            return {product, users};
        } catch (err) {
            throw err;
        }
    }

    async getAllProducts(query?: any, options?: any): Promise<PaginateResult<ProductInterface>> {
        try {
            return await this.repository.find(query, options);
        } catch (err) {
            throw err;
        }
    }

    async findOneProduct(body: any, select?: any): Promise<ProductInterface> {
        try {
            return select ? await this.repository.findOne(body, select) : await this.repository.findOne(body);
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

    async createComment(productId: ObjectId, commentBody: any): Promise<any> {
        try {
            await Product.updateOne(
                { "_id": productId }, { $push: { "comment": {...commentBody} } },
                { returnOriginal: false }
            );
            const product = await Product.findById(productId);
            const commentLength = product?.comment.length;
            const comment = product?.comment[commentLength - 1];
            return comment;
        } catch (err) {
            throw err;
        }
    }

    async editComment(productId: ObjectId, commentId: ObjectId, commentBody: any): Promise<any> {
        try {
            await Product.updateOne(
                { _id: productId },
                { $set: { "comment.$[element].comment": commentBody?.comment } },
                { arrayFilters: [{ "element._id": commentId }], upsert: true },
            );
            const product = await Product.findById(productId);
            const comment = product?.comment.find((comment: any) => {
                console.log({commentID: comment._id.toString(), commentId})
                return String(commentId) === comment._id.toString()
            }
            );  
            return comment;  
        } catch (err) {
            throw err;
        }
    }

    async deleteComment(productId: ObjectId, commentId: ObjectId,) {
        try {
            console.log({productId, commentId})
            await Product.updateOne(
                { _id: productId },
                { $pull: { comment: { _id: commentId }  } },
                { returnOriginal: false }
            );
            const product = await Product.findById(productId);
            return product;
        } catch (err) {
            throw err;
        }
    }

}

