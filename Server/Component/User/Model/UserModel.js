const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema=new Schema({
    id:{type:ObjectId},
    roleID:{type:String},
    password:{type:String},
    fullname:{type:String},
    username:{type:String},
    address:{type:String},
    email:{type:String},
    CCCD:{type:String},
    phoneNumber:{type:String},
    isDisabled:{type:Boolean,default:false}
});
module.exports = mongoose.models.user || mongoose.model('user',userSchema);