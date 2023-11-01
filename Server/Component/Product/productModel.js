const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;
const optionSchema=new Schema({
    title:{type:String},
    color:{type:String},
    titleColor:{type:String},
    size:{type:String},
    weight:{type:String},
    imageOption:{type:String}
});
const productSchema=new Schema({
    id:{type:ObjectId},
    userID:{type:String},
    categoryID:{type:String},
    price:{type:Number},
    detail:{type:String},
    image:{type:[String]},
    isApproved:{type:Boolean, default: false},
    name:{type:String},
    quantity:{type:Number},
    sold:{type:Number, default: 0},
    rating:{type:Number, default: 0},
    isShow:{type:Boolean, default: true},
    saleOff:{type:Number, default: 0},
    options:[optionSchema]
});



module.exports = mongoose.models.product || mongoose.model('product',productSchema);