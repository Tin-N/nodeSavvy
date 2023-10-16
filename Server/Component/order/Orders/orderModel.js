const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    orderID: { type: ObjectId, ref: 'OrderDetail' },
    userID: { type: ObjectId, ref: 'Users' },
    orderDate: { type: Date }
});
module.exports = mongoose.models.order || mongoose.model('Order', orderSchema);