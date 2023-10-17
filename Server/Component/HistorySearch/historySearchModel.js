
const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const SearchHistorySchema = new mongoose.Schema({
    id:{type:ObjectId},
    userId: { type: String},
    keyword: { type: String},
    searchTypes: { type: String}, // 'app' hoặc 'store'
    // searchTime: { type: String},
    // Thêm các trường khác
});
module.exports = mongoose.model('searchhistory', SearchHistorySchema)||mongoose.models.product;
