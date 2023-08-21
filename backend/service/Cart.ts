import { ObjectId } from "mongoose";
import { HTTP404NotFoundError } from "../exceptions/AppError";
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

    async payCart(userId: ObjectId, checkout: any): Promise<CartInterface> {
        const where = { user: userId, status: "active" };

        try {
            await this.repository.updateMany(where, checkout);

            let cart = await this.repository.findOne(where);

            return cart;
        }
        catch (error) {
            throw error;
        }
    }

    async findOneCart(where: any, sort?: any): Promise<CartInterface> {
        const populate = ['products', 'name image price type'];
        try {
            return await this.repository.findOne(where, populate);
        } catch (err) {
            throw err;
        }
    }

    async findAllCarts(where?: any, options?: any): Promise<PaginateResult<CartInterface>> {
     
        try {
            return await this.repository.find(where, options);
        } catch (err) {
            throw err;
        }
    }

    async addToCart(body: any, userId: ObjectId, productId: string): Promise<CartInterface | null> {
        let cart: CartInterface | null;

        let quantity: number = parseInt(body.quantity);

        let size: string = body.size;

        let price: number = body.price;

        let isSame: boolean = false;

        const whereCart = { user: userId, status: "active" }
        try {
            cart = await this.repository.findOne(whereCart);
            if (cart && cart.description) {
                // If existing product in the cart, then just can edit quanity.
                let { total } = cart
                cart.products.forEach(async function (value, index,) {
                    if (value.toString() === productId && cart?.description[index].size === size) {
                        cart.description[index].quantity += quantity;
                        cart.description[index].subtotal += price * quantity
                        isSame = true;
                    }
                });
                if (isSame) await cart?.save();
                // Else push in the new product
                else {
                    cart.total = total + (price * quantity)
                    cart.products.push(productId)
                    cart.description.push({ quantity, size, price, subtotal: price * quantity })
                    await cart?.save();
                }
                // Update the stock
                const increment = { $inc: { "stock": -1 * quantity } }
                await this.productRepository.findByIdAndUpdate(productId, increment);
            }
            return cart;
        }
        catch (error) {
            throw error
        }
    }

    async editCart(body: any, userId: ObjectId, productId: string): Promise<CartInterface | null> {
        let cart: CartInterface | null;

        let quantity: number = parseInt(body.quantity);

        let size: string = body.size;

        let currentQuantity: number = 0;

        const whereCart = { user: userId, status: "active" }

        try {
            cart = await this.repository.findOne(whereCart);

            if (cart && cart.description) {
                // Since the existing product is in the cart, then just can edit quanity.
                cart.products.forEach(async function (value, index,) {
                    if (value.toString() === productId && cart?.description[index].size === size) {
                        currentQuantity = quantity;

                        cart.description[index].quantity = quantity;

                        cart.total -= cart.description[index].subtotal

                        cart.description[index].subtotal = cart.description[index].price * quantity

                        cart.total += cart.description[index].subtotal
                    }
                });
                await cart?.save();
                // Update the stock
                const increment = { $inc: { "stock": currentQuantity + (-1 * quantity) } }

                await this.productRepository.findByIdAndUpdate(productId, increment);
            }
            return cart;
        }
        catch (error) {
            throw error
        }
    }

    async deleteCartProduct(userId: ObjectId, deleteProductIndex: number): Promise<number> {
        let cart: CartInterface | null;

        let quantity: number | null;

        let productId: string;

        const whereCart = { user: userId, status: "active" }

        try {
            cart = await this.repository.findOne(whereCart);

            if (cart && cart.description && cart) {
                productId = cart.products[deleteProductIndex].toString();

                quantity = cart.description[deleteProductIndex].quantity;

                cart.total -= cart.description[deleteProductIndex].subtotal

                cart.products = cart.products.filter((_value, currindex) => currindex !== deleteProductIndex);

                cart.description = cart.description.filter((_value, currindex) => currindex !== deleteProductIndex);

                await cart.save();
            }

            else throw new HTTP404NotFoundError();

            const incrementBody = { $inc: { "stock": quantity } };

            await this.productRepository.findByIdAndUpdate(productId, incrementBody);

            return deleteProductIndex;
        }
        catch (error) {
            throw error
        }
    }

    async deleteCarts(ids: Array<string>) {
        try {
            await this.repository.deleteCarts(ids);
        } 
        catch (err) {
            throw err;
        }
    }
}

