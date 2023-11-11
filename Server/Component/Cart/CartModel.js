const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productsOptionsSchema = new Schema({
    color: { type: String },
    size: { type: String },
})

const productSchema = new Schema({
    isSelected: { type: Boolean, default: false },
    ownerID: { type: ObjectId },
    productID: { type: ObjectId },
    quantity: { type: Number },
    itemTotalCost: { type: Number },
    options: { productsOptionsSchema },
});

const cartSchema = new Schema({
    userID: { type: ObjectId },
    products: [productSchema]
});
module.exports = mongoose.models.cart || mongoose.model('cart', cartSchema);