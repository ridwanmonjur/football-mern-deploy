import { ObjectId } from "mongoose";
import { APIError, HTTP401UnauthorizedError, HTTP404NotFoundError, HTTP500InternalServerrror } from "../exceptions/AppError";
import { CartInterface } from "../models/Cart";
import { CartRepository } from "../repository/Cart";
import { ProductRepository } from "../repository/Product";


// All Business logic will be here

export class CartService {
    repository: CartRepository;

    productRepository: ProductRepository;
    constructor() {
        this.repository = new CartRepository();

        this.productRepository = new ProductRepository();
    }

    async createCart(userId: ObjectId): Promise<CartInterface> {
        const where = { user: userId, status: "active" };

        const body = { status: "paid", paidAt: new Date() };

        const newCart = { user: userId, status: "active" };

        try {
            await this.repository.updateMany(where, body);

            let cart = await this.repository.createOne(newCart);

            return cart;
        }
        catch (error) {
            throw error;
        }
    }

    async findOneCart(body: any): Promise<CartInterface> {
        const populate = ['products', 'name image price type'];
        try {
            return await this.repository.findOne(body, populate);
        } catch (err) {
            throw err;
        }
    }

    async findAllCarts(where: any): Promise<Array<CartInterface>> {
        const populate = ['products', 'name image price type'];
        try {
            return await this.repository.find(where, populate);
        } catch (err) {
            throw err;
        }
    }

    async addToCart(body: any, userId: ObjectId, productId: string): Promise<CartInterface | null> {
        let cart: CartInterface | null;
        let quantity: number = parseInt(body.quantity);
        let size: string = body.size;
        let isSame: boolean = false;
        const whereCart = { user: userId, status: "active" }
        try {
            cart = await this.repository.findOne(whereCart);
            if (cart && cart.description) {
                // If existing product in the cart, then just can edit quanity.
                cart.products.forEach(async function (value, index,) {
                    if (value.toString() === productId && cart?.description[index].size === size) {
                        cart.description[index].quantity += quantity;
                        isSame = true;
                    }
                });
                if (isSame) await cart?.save();
                // Else push in the new product
                else {
                    const update = { $push: { products: productId, description: { quantity, size } } }
                    await this.repository.updateOne(whereCart, update);
                }
                // Update the stock
                const increment = { $inc: { "stock": -1 * quantity } }
                await this.productRepository.findByIdAndUpdate(productId, increment);
                return cart;
            }
        }
        catch (error) {
            throw error
        }
    }

    async editCart(body: any, userId: ObjectId, productId: string): Promise<CartInterface | null> {
        let cart: CartInterface | null;
        let quantity: number = parseInt(body.quantity);
        let size: string = body.size;
        let isSame: boolean = false;
        let currentQuantity: number = 0;
        const whereCart = { user: userId, status: "active" }
        try {
            cart = await this.repository.findOne(whereCart);
            if (cart  && cart.description) {
                // Since the existing product is in the cart, then just can edit quanity.
                cart.products.forEach(async function (value, index,) {
                    if (value.toString() === productId && cart?.description[index].size === size) {
                        currentQuantity = quantity;
                        if (cart) cart.description[index].quantity = quantity;
                        isSame = true;
                    }
                });
                if (isSame) await cart?.save();
                // Update the stock
                const increment = { $inc: { "stock": currentQuantity + (-1 * quantity) } }
                await this.productRepository.findByIdAndUpdate(productId, increment);
            }
            console.log({ cart, whereCart, size, quantity })
            return cart;
        }
        catch (error) {
            throw error
        }
    }

    async deleteCartProduct(userId: ObjectId, deleteProductIndex: number): Promise<number> {
        let cart: CartInterface | null;

        let quantity: number | null;

        let productId: string | null;

        const whereCart = { user: userId, status: "active" }

        try {
            cart = await this.repository.findOne(whereCart);

            if (cart && cart.description && cart) {
                productId = cart.products[deleteProductIndex].toString();

                quantity = cart.description[deleteProductIndex].quantity;

                cart.products = cart.products.filter((_value, currindex) => currindex !== deleteProductIndex);

                cart.description = cart.description.filter((_value, currindex) => currindex !== deleteProductIndex);

                await cart.save();
            }

            else throw new APIError ("Malformed cart")

            const incrementBody = { $inc: { "stock": quantity } };

            await this.productRepository.findByIdAndUpdate(productId, incrementBody);

            console.log({ cart, productId, deleteProductIndex, userId, quantity })

            return deleteProductIndex;
        }
        catch (error) {
            if (!cart) throw new HTTP404NotFoundError();

            throw new HTTP500InternalServerrror("Unable to delete carts");
        }
    }
}

