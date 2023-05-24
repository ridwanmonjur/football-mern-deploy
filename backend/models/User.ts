import { Schema, model, Document } from 'mongoose';

// not written in the docs but must be written!!!
// ** extends Document **

interface TokenInterface {
    resetPassword: string,
    verifyEmail: string,
    isVerified: boolean
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
        default: 'customer',
        required: true
    },
    token: {
        resetPassword: String,
        verifyEmail: String,
        isVerified : {
            type: Boolean,
            default: false
        }
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
