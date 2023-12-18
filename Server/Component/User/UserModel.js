const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema=new Schema({
    id:{type:ObjectId},
    roleID:{type:Number, default:1}, //1 user | 2 cho duyet | 3 seller
    password:{type:String},
    fullname:{type:String},
    username:{type:String},
    address:{type:String},
    email:{type:String},
    CCCD:{type:String},
    phoneNumber:{type:String},
    avatar:{type:String},
    isVerified:{type:Boolean, default:false},
    isDisabled:{type:Boolean,default:false},
    emailToken:{type:String},
});
module.exports = mongoose.models.user || mongoose.model('user',userSchema);