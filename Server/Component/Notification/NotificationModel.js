const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const notificationSchema=new Schema({
    id:{type:ObjectId},
    userID:{type:String},
    productID:{type:String},
    notification:{type:String}
});

module.exports = mongoose.models.notification || mongoose.model('notification',notificationSchema);