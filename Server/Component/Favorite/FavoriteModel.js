const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const favoriteSchema=new Schema({
    productID:{type:String},
    userID:{type:String},
});
module.exports = mongoose.models.favorite || mongoose.model('favorite',favoriteSchema);