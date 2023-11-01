const feedbackModel = require('./feedbackModel')
const addFeedback = async (
    productID, userID, rating, feedback, reply
    ) => {
    try {
        const newFeedback = {
            productID, userID, rating, feedback, reply
        };
        const newP = new feedbackModel(newFeedback);
        await newP.save();
    } catch (err) {
        console.log("Không bình luận được(Ser): " + err);
        return false;
    }
}
const addReply = async (feedbackID, userID, reply) => {
    try {
        const newR = await feedbackModel.updateOne({
            _id: feedbackID
        },{
            $push:{
                reply:{
                    userID: userID,
                    reply: reply
                }
            }
        });
        if (newR.modifiedCount === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('Không thể trả lời bình luận(Ser): '+error);
        return false;
    }
}
const getFeedbackByProductID = async(id) => {
    try {
        return await feedbackModel.find({productID: id});
    } catch (error) {
        console.log('getFeedbackByProductID error(Ser): '+error);
    }
}
module.exports = {addFeedback, addReply, getFeedbackByProductID}