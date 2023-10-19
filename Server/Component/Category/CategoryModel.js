const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const categorySchema=new Schema({
    id:{type:ObjectId},
    name:{type:String},
});
module.exports = mongoose.models.category || mongoose.model('category',categorySchema);