const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const colorSchema = new Schema({
    id: { type: ObjectId },
    productID: { type: String },
    color: { type: String },
    title: { type: String },
    image: { type: String }
});
module.exports = mongoose.models.color || mongoose.model('color', colorSchema);