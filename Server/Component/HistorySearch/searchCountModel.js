const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;


const SearchCountSchema = new mongoose.Schema({
    keyword: { type: String, required: true },
    searchTypes: { type: String, required: true },
    searchCount: { type: Number, default: 1 },
});


SearchCountSchema.pre('save', function (next) {
    if (this.isNew) {
        this.searchCount = 1;
        console.log("Đã thểm");
    } else {
        this.searchCount += 1;
        console.log("Đã tạo mới");
    }
    next();
});

module.exports = mongoose.models.searchcount||mongoose.model('searchcount', SearchCountSchema);