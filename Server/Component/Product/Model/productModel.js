const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;


const productSchema=new Schema({
    id:{type:ObjectId},
    userID:{type:String},
    categoryID:{type:String},
    price:{type:Number},
    detail:{type:String},
    image:{type:[String]},
    isApproved:{type:Boolean},
    name:{type:String},
    quantity:{type:Number},
    options:[optionSchema]
});
const optionSchema=new Schema({
   
    title:{type:String},
    color:{type:String},
    size:{type:String},
    weight:{type:String},
    imageOption:{type:String}
});
module.exports = mongoose.models.product || mongoose.model('product',productSchema);