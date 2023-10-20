const { json } = require('express');
const likeModel= require('./LikeModel');

const addLike = async(userId,feedbackId) =>{

try {
    const like={userId: userId, feedbackId: feedbackId};
    const newLike= new likeModel(like);
    return await newLike.save()
} catch (error) {
    return json({result:false, error:"Service error: "+error})
}
}

const getLikeByUserId = async (userId,feedbackId) =>{
    try {
        return likeModel.findOne({userId:userId,feedbackId:feedbackId});
    } catch (error) {
        return json({result:false, error:"Service error: "+error})
    }
}
const countLike = async (feedbackId) =>{
    try {
        return likeModel.findOne({feedbackId:feedbackId}).count();
    } catch (error) {
        return json({result:false, error:"Service error: "+error})
    }
}
const unlike = async(id) =>{
        try {
            return likeModel.findByIdAndDelete(id);
        } catch (error) {
            return json({result:false, error:"Service error: "+error})
        }
    }
module.exports ={
    addLike,
    unlike,
    getLikeByUserId,
    countLike
}
