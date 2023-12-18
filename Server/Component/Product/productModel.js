const mongoose = require('mongoose');

const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;
const optionSchema=new Schema({
    title:{type:String},
    color:{type:String},
    titleColor:{type:String},
    size:{type:String},
    weight:{type:String},
    imageOption:{type:String}
});
const productSchema=new Schema({
    id:{type:ObjectId},
    userID:{type:String},
    categoryID:{type:String},
    price:{type:Number},
    detail:{type:String},
    image:{type:[String]},
        // 1 - Đang chờ, 2 - Đã duyệt, 3 - Hủy
    // Seller gửi yêu cầu => 1 
    // Admin chấp nhận => 2 
    // Admin từ chối => 3 cho vào  list hủy bên seller, cho seller sửa thông tin lại => khi seller gửi yêu cầu lại thì sửa thành 1
    isApproved: { type: Number, default:1 },
    name:{type:String},
    quantity:{type:Number},
    sold:{type:Number, default: 0},
    rating:{type:Number, default: 0},
    isShow:{type:Boolean, default: true},
    saleOffID:{type:String},
    options:[optionSchema]
});
module.exports = mongoose.models.product || mongoose.model('product',productSchema);