import { Schema, model, Document, Types, PopulatedDoc, PaginateModel } from 'mongoose'
import { winstonLogger } from '../winston/logger';
import { UserInterface } from './User';
// var slugify = require('slugify')
var faker = require('faker')
import * as mongoosePaginate from 'mongoose-paginate-v2'

interface CommentInterface extends Document {
    userId: string,
    comment: string
}
// not written in the docs but must be written!!!
// ** extends Document **

const CommentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },

})



const Comment = model<CommentInterface, PaginateModel<CommentInterface>>('Comment', CommentSchema)


export { Comment, CommentInterface, CommentSchema }


