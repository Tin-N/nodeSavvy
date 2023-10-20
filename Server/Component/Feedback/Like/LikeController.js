const { json } = require('express')
const likeService= require('./LikeService')

const addLike = async (userId,feedbackId)=>{
    try {
        return await likeService.addLike(userId,feedbackId);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}

const unlike = async (userId,feedbackId)=>{
    try {
        return await likeService.unlike(userId,feedbackId);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}
const getLikeByUserId = async (userId,feedbackId)=>{
    try {
        return await likeService.getLikeByUserId(userId,feedbackId);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}
const countLike = async (feedbackId)=>{
    try {
        return await likeService.countLike(feedbackId);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}
module.exports={
    addLike,
    unlike,
    getLikeByUserId,
    countLike
}