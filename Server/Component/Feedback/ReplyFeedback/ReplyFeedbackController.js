const replyfeedbackService= require('./ReplyFeedbackService');
const addReply = async (userId,feedbackId,reply)=>{
    try {
        return await replyfeedbackService.addReply(userId,feedbackId,reply);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}

const getReplyByFeedbackId = async (feedbackId)=>{
    try {
        return await likeService.getLikeByUserId(userId,feedbackId);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}
const deleteReply = async (id)=>{
    try {
        return await replyfeedbackService.deleteReply(id);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}
module.exports={
    deleteReply,
    addReply,
    // getReplyByUserIdAndFeedbackId,
    getReplyByFeedbackId
}