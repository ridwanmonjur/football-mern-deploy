import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { CartInterface } from "./Cart"

// not written in the docs but must be written!!!
// ** extends Document **
interface UserInterface extends Document {
    name: string
    email: string
    password: string,
    role: string,
    cart: PopulatedDoc<CartInterface>,
    addressFirst: string,
    addressSecond: string,
    creditCardNumber: string,
    creditCardCVV: string,
    totalPurchase: number
}

const schema = new Schema<UserInterface>({
    name:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password:
    {
        type: String,
        select: false,
        required: true
    },
    role:  {
        type: String,
        default: 'Buyer',
        required: true
    },
    addressFirst: String,
    addressSecond: String,
    creditCardNumber: String,
    creditCardCVV: String,
})


const User = model('User', schema)

export { User, UserInterface }
