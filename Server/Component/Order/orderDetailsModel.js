const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    ownerID: { type: ObjectId },
    productID: { type: ObjectId},
    quantity: { type: Number },
    itemTotalCost: { type: Number },
    options: [{ type: String }],
    deliveryStatus: { type: String },
});

const orderDetailsSchema = new Schema({
    orderDetailID: { type: ObjectId},
    products: [productSchema],
    totalCost: { type: Number },
});

module.exports = mongoose.models.orderdetal || mongoose.model('orderdetail', orderDetailsSchema);
