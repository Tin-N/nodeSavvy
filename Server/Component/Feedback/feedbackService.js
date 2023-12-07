const feedbackModel = require('./feedbackModel')
const addFeedback = async (
    productID, userID, rating, feedback
            // , reply
            ,image
    ) => {
    try {
        let newFeedback = {
            productID, userID, rating, feedback
            // , reply
            
        };
        if(typeof image!=='undefined')
            newFeedback={...newFeedback,image}

        const newP = new feedbackModel(newFeedback);
      return  await newP.save();
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
const getFeedbackByProductID = async(id,limit,skip) => {
    try {
        const result=await feedbackModel.find({productID: id}).limit(limit?limit:10).skip(skip);
        const count=await feedbackModel.find({productID: id}).count();

        return {result:result,count:count}
    } catch (error) {
        console.log('getFeedbackByProductID error(Ser): '+error);
    }
}
const deleteFeedback = async(id) => {
    try {
        return await feedbackModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('getFeedbackByProductID error(Ser): '+error);
    }
}
module.exports = {deleteFeedback,addFeedback, addReply, getFeedbackByProductID}