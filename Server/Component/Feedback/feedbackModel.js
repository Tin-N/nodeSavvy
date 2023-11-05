const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;
const replySchema=new Schema({
    userID:{type:String},
    reply:{type:String}
});
const feedbackSchema=new Schema({
    id:{type:ObjectId},
    productID:{type:String},
    userID:{type:String},
    rating:{type:Number},
    feedback:{type:String},
    // reply:[replySchema],
    image:{type:[String]}
});
module.exports = mongoose.models.feedback || mongoose.model('feedback',feedbackSchema);