const replyfeedbackModel= require('./ReplyFeedbackModel')



const addReply = async(userId,feedbackId,reply) =>{

    try {
        const reply={userId: userId, feedbackId: feedbackId,reply:reply};
        const newReply= new replyfeedbackModel(reply);
        return await newReply.save()
    } catch (error) {
        return json({result:false, error:"Service error: "+error})
    }
    }
    
    // const getReplyByUserIdAndFeedbackId = async (userId,feedbackId) =>{
    //     try {
    //         return likeModel.find({userId:userId,feedbackId:feedbackId});
    //     } catch (error) {
    //         return json({result:false, error:"Service error: "+error})
    //     }
    // }
    const getReplyByFeedbackId = async (feedbackId) =>{
        try {
            return replyfeedbackModel.find({feedbackId:feedbackId});
        } catch (error) {
            return json({result:false, error:"Service error: "+error})
        }
    }
    const deleteReply = async(id) =>{
            try {
                return replyfeedbackModel.findByIdAndDelete(id);
            } catch (error) {
                return json({result:false, error:"Service error: "+error})
            }
        }

module.exports={
    deleteReply,
    addReply,
    // getReplyByUserIdAndFeedbackId,
    getReplyByFeedbackId
}