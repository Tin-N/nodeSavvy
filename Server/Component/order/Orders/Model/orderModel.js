const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const orderSchema=new Schema({
    id:{type:ObjectId},
    userID:{type:String},
    orderDetailsId:{type:[String]},
});
module.exports = mongoose.models.order || mongoose.model('order',orderSchema);