const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    orderID: { type: ObjectId, default: () => new mongoose.Types.ObjectId() },
    orderDetailID: { type: ObjectId },
    userID: { type: ObjectId },
    orderDate: { type: Date },
    paymentStatus: { type: String },
    paymentMethods: { type: String },
    ownerID: [{type: ObjectId}],
    address: {type: String},
    isConfirmed: {type: Boolean}
});
module.exports = mongoose.models.order || mongoose.model('Order', orderSchema);

