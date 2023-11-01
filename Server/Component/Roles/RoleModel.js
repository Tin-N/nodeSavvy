const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const roleSchema=new Schema({
    id:{type:ObjectId},
    name:{type:String},
   
});
module.exports = mongoose.models.role || mongoose.model('role',roleSchema);