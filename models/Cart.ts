import { Schema, model, Document,  PopulatedDoc } from 'mongoose'
import { ProductInterface } from './Product';
import { UserInterface } from './User';
// var slugify = require('slugify')
var faker = require('faker')

interface CartInterface extends Document {
    user: PopulatedDoc<UserInterface>,
    description: Array<{
        quantity: number,
        size: string
    }>,
    products: Array<PopulatedDoc<ProductInterface>>,
    status: string,
    paidAt: Date,
    deliveredAt: Date
}

const CartSchema = new Schema<ProductInterface>({

    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    description: [{
        quantity: Number,
        size: String
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
    creation_date: { type: Date, default: new Date() }
},
    // The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
    //  specified in our schema do not get saved to the db.
    { strict: true, timestamps: true }
)


const Cart = model<CartInterface>('Cart', CartSchema)




export { Cart, CartInterface }
// exports 'Product' interface
