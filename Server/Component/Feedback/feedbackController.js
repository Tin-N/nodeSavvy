const feedbackService = require('./feedbackService');
const addFeedback = async (
    productID, userID,
    rating, feedback, reply) => {
    try {
        return await feedbackService.addFeedback(
            productID, userID, rating, feedback, reply
        );
    } catch (err) {
        console.log('Không thể thêm bình luận(Contr): ' + err);
    }
}
const addReply = async (feedbackID, userID, reply) => {
    try {
        return await feedbackService.addReply(feedbackID, userID, reply);
    } catch (error) {
        console.log('Không thể trả lời bình luận(Contr): ' + error);
    }
}
const getFeedbackByProductID = async (id) => {
    try {
        return await feedbackService.getFeedbackByProductID(id);
    } catch (error) {
        console.log('getFeedBackByProductID error(Contr): '+error);
    }
}
module.exports = { addFeedback, addReply, getFeedbackByProductID }