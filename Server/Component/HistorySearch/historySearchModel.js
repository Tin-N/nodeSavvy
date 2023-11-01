
const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const SearchHistorySchema = new mongoose.Schema({
    id:{type:ObjectId},
    userId: { type: String},
    keyword: { type: String},
    isHidden:{type:Boolean,default:false},

    // searchTypes: { type: String,default:' '},    // ' ' nếu là tìm kiếm toàn bộ ứng dụng 
                                                // hoặc có một chuỗi là idUser nếu là tìm kiếm trong từng shop

    // searchCount: { type: Number, default: 1 }, // Mặc định là 1
    // searchTime: { type: String},
    // Thêm các trường khác
});
module.exports = mongoose.model('searchhistory', SearchHistorySchema)||mongoose.models.searchhistory;


