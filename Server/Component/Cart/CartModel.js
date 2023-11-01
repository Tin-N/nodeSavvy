const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    ownerID: {type: ObjectId},
    productID: { type: ObjectId},
    quantity: { type: Number },
});

const cartSchema = new Schema({
    userID: {type: ObjectId},
    products: [productSchema]
});
module.exports = mongoose.models.cart || mongoose.model('cart', cartSchema);