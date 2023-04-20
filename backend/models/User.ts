import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { CartInterface } from "./Cart"

// not written in the docs but must be written!!!
// ** extends Document **

interface TokenInterface {
    refreshJWT: string,
    resetPassword: string,
    forgotPassword: string
}

interface AddressInterface {
    first: string,
    second: string,
}


interface CreditCardInterface {
    number: string,
    CVV: string
}
interface UserInterface extends Document {
    name: string
    email: string
    password: string,
    role: string,
    cart: PopulatedDoc<CartInterface>,
    address: AddressInterface,
    creditCard: CreditCardInterface,
    token: TokenInterface
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
    role: {
        type: String,
        default: 'Buyer',
        required: true
    },
    token: {
        refreshJWT: String,
        resetPassword: String,
        forgotPassword: String,
    },
    address: {
        first: String,
        second: String
    },
    creditCard: {
        number: String,
        CVV: String
    },
})


const User = model('User', schema)

export { User, UserInterface }
