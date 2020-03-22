const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CategorysubSchema = new Schema({
    ID: { unique: true, type: String },
    MALL_CATEGORY_ID: { type: String },
    MALL_SUB_NAME: { type: String },
    COMMENTS: { type: String },
    SORT: { type: Number }
})

mongoose.model('CategorySub', CategorysubSchema)