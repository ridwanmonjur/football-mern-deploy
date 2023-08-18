import { Schema, model, Document, Types, PopulatedDoc, PaginateModel } from 'mongoose'
import { winstonLogger } from '../winston/logger';
import { UserInterface } from './User';
// var slugify = require('slugify')
var faker = require('faker')
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { CommentSchema, CommentInterface } from './Comment';

interface ProductInterface extends Document {
    name: string,
    slug: string,
    type: string,
    manufacturer: string,
    seller: PopulatedDoc<UserInterface>
    price: number,
    image: string,
    stock: number,
    comment?: Types.DocumentArray<CommentInterface>;
    description?: string;
}

// not written in the docs but must be written!!!
// ** extends Document **


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    image:  {
        type: String,
        required: true
    },
    slug: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    seller: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    description: {
        type: String,
        required: false
    },
    comment: {
        type: [CommentSchema],
        default: [],
        required: false
    }
},
    { strict: true }
)

ProductSchema.plugin(mongoosePaginate);


const Product = model<ProductInterface, PaginateModel<ProductInterface>>('Product', ProductSchema)

ProductSchema.pre<ProductInterface>('save', function () {
    this.slug = faker.helpers.slugify(this.name)
})

export { Product, ProductInterface }


