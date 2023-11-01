const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

<<<<<<< Updated upstream
const optionSchema=new Schema({
    title:{type:String},
    color:{type:String},
    titleColor:{type:String},
    size:{type:String},
    weight:{type:String},
    imageOption:{type:String}
});
=======
>>>>>>> Stashed changes
const productSchema=new Schema({
    id:{type:ObjectId},
    userID:{type:String},
    categoryID:{type:String},
    price:{type:Number},
    detail:{type:String},
<<<<<<< Updated upstream
    image:{type:[String]},
    isApproved:{type:Boolean,default:false},
    name:{type:String},
    quantity:{type:Number},
    sold:{type:Number},
    rating:{type:Number},
    options:[optionSchema]
});

=======
    image:{type:String},
    isApproved:{type:Boolean},
    name:{type:String},
    quantity:{type:Number}
});
>>>>>>> Stashed changes
module.exports = mongoose.models.product || mongoose.model('product',productSchema);