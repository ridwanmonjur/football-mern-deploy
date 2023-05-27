import { Schema, model, Document, PopulatedDoc, PaginateModel } from 'mongoose'
import { ProductInterface } from './Product';
import { UserInterface } from './User';
import * as mongoosePaginate from 'mongoose-paginate-v2'
interface CartInterface extends Document {
    user: PopulatedDoc<UserInterface>,
    description: Array<{
        quantity: number,
        size: string,
        price: number,
        subtotal: number,
    }>,
    products: Array<PopulatedDoc<ProductInterface>>,
    status: string,
    paidAt: Date,
    deliveredAt: Date,
    total: number
}

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    description: [{
        quantity: Number,
        size: String,
        subtotal: Number,
        price: Number,
    }],
    products: [
        {
            type: Schema.Types.ObjectId, ref: 'Product'
        }
    ],
    status: {
        type: String,
        enum: ['active', 'paid', 'delivered'],
        default: 'active'
    },
    paidAt: Date,
    deliveredAt: Date,
    total: Number,
},
    { strict: true, timestamps: true }
)

CartSchema.plugin(mongoosePaginate);

CartSchema.pre<CartInterface>('save', function () {
    let total = 0, subtotal = 0;
    this.description.forEach((value, index) => {
        console.log({ value, index })
        console.log({ description: this.description })
        subtotal = this.description[index].quantity * this.description[index].price;
        total += subtotal;
        this.description[index].subtotal = subtotal
    })
    this.total = total;
})

const Cart = model<CartInterface, PaginateModel<CartInterface>>('Cart', CartSchema)

export { Cart, CartInterface }
