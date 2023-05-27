import { Schema, model, Document, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2'

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

const UserSchema = new Schema({
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
        required: true,
        enum: ['customer', 'admin', 'seller'],
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
        CVV: {
            type: String,
            required: false,
        }
    },
})

UserSchema.plugin(mongoosePaginate);


const User = model<UserInterface, PaginateModel<UserInterface>>('User', UserSchema)

export { User, UserInterface }
