const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const orderDetailsSchema=new Schema({
    id:{type:ObjectId},
    productID:{type:String},
    orderID:{type:String},
    totalCost:{type:Number},
    quantity:{type:Number}
});
module.exports = mongoose.models.orderdetal || mongoose.model('orderdetail',orderDetailsSchema);
