const feedbackService = require('./feedbackService');
const addFeedback = async (
    productID, userID,
    rating, feedback,image) => {
    try {
        return await feedbackService.addFeedback(
            productID, userID, rating, feedback
            // , reply
            ,image
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
const getFeedbackByProductID = async (id,limitData,size) => {
    try {
        let skip = 0;

        if (typeof limitData !== "undefined" && limitData > 0)
          skip = (size - 1) * limitData;
        else {
          if (size == 1) skip = 0;
          else if (size > 1) skip = (size - 1) * 20;
        }
        console.log("page: " + skip);
        return await feedbackService.getFeedbackByProductID(id,limitData,skip);
    } catch (error) {
        console.log('getFeedBackByProductID error(Contr): '+error);
    }
}
const deleteFeedback = async (id) => {
    try {
        return await feedbackService.deleteFeedback(id);
    } catch (error) {
        console.log('getFeedBackByProductID error(Contr): '+error);
    }
}
module.exports = { deleteFeedback,addFeedback, addReply, getFeedbackByProductID }