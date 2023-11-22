const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const saleOffSchema = new Schema({
    id: { type: ObjectId },
    userID: {type: String},
    titleSale: {type: String},
    productID: {type: String},
    saleOff: { type: Number},
    startDay: {type: Number},
    endDay: {type: Number}
});

module.exports = mongoose.models.saleOff || mongoose.model('saleOff', saleOffSchema);