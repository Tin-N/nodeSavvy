const FavoriteService= require('./FavouriteService');
const addFavorite = async (userId,productID)=>{
    try {
        return await FavoriteService.addFavorite(userId,productID);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}

const getFavoriteByFeedbackId = async (userID,productID)=>{
    try {
        return await FavoriteService.getFavoriteByUserId(userID,productID);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}
const deleteFavorite = async (id)=>{
    try {
        return await FavoriteService.deleteFavorite(id);
    } catch (error) {
        return json({result:false, message:"Like Controller Error: "+error})
    }
}
module.exports={
    deleteFavorite,
    addFavorite,
    // getFavoriteByUserIdAndFeedbackId,
    getFavoriteByFeedbackId
}