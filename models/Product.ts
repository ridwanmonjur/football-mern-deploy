import { Schema, model, Document, Types } from 'mongoose'
// var slugify = require('slugify')
var faker = require('faker')

interface CommentInterface extends Document {
    userId: string,
    comment: string
}

interface ProductInterface extends Document {
    name: string,
    slug: string,
    type: string,
    manufacturer: string,
    price: number,
    ratings: number,
    image: string,
    stock: number,
    amount: number,
    comment: Types.DocumentArray<CommentInterface>;
}

// not written in the docs but must be written!!!
// ** extends Document **

const CommentSchema = new Schema<CommentInterface>({
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },

})

const ProductSchema = new Schema<ProductInterface>({
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
    image: String,
    slug: String,
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    },
    comment: [CommentSchema]
},
    // The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
    //  specified in our schema do not get saved to the db.
    { strict: true }
)


const Comment = model<CommentInterface>('Comment', CommentSchema)
const Product = model<ProductInterface>('Product', ProductSchema)

ProductSchema.pre('save', function () {
    this.slug = faker.helpers.slugify(this.name)
    console.log(this.slug)
})

// ProductSchema.post('save',  function (error: Error , doc: Document) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//         next(new Error('email must be unique'));
//     } else {
//         next(error);
//     }
// })
export { Comment, Product, ProductInterface, CommentInterface }
// exports 'Product' interface


