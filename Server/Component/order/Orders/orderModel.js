const mongoose = require('mongoose');
<<<<<<< Updated upstream
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    orderID: { type: ObjectId, default: () => new mongoose.Types.ObjectId() },
    orderDetailID: { type: ObjectId, ref: 'OrderDetail' },
    userID: { type: ObjectId, ref: 'Users' },
    orderDate: { type: Date }
});
module.exports = mongoose.models.order || mongoose.model('Order', orderSchema);
=======
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const favoriteSchema=new Schema({
    id:{type:ObjectId},
    productID:{type:String},
    userID:{type:String},
});
module.exports = mongoose.models.favorite || mongoose.model('favorite',favoriteSchema);
>>>>>>> Stashed changes
