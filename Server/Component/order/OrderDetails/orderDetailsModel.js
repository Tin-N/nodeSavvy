const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    productID: { type: ObjectId, ref: 'products' },
    quantity: { type: Number },
    itemTotalCost: { type: Number }
    // options: { type: String } // Các tùy chọn khác, có thể là một chuỗi
});

const orderDetailsSchema = new Schema({
    orderDetailID: { type: ObjectId, default: () => new mongoose.Types.ObjectId() },
    products: [productSchema],
    totalCost: { type: Number },
});
module.exports = mongoose.models.orderDetail || mongoose.model('OrderDetail', orderDetailsSchema);