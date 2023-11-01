const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sizeSchema = new Schema({
    id: { type: ObjectId },
    productID: { type: String },
    size: { type: String },
});
module.exports = mongoose.models.size || mongoose.model('size', sizeSchema);