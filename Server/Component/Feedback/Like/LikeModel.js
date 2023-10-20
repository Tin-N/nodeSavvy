const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId=Schema.ObjectId;

const replyFeedbackSchema = new mongoose.Schema({
    id:{type:ObjectId},
    userId: { type: String},
    feedbackId: { type: String}, // 'app' hoặc 'store'
    // searchTime: { type: String},
    // Thêm các trường khác
});
module.exports = mongoose.model('replyfeedback', replyFeedbackSchema)||mongoose.models.replyfeedback;