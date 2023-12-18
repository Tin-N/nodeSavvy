const FavoriteService= require('./FavouriteService');
const addFavorite = async (userId,productID)=>{
    try {
        return await FavoriteService.addFavorite(userId,productID);
    } catch (error) {
        return {result:false, message:"Like Controller Error: "+error}
    }
}

const getFavoriteByFeedbackId = async (userID,productID)=>{
    try {
        return await FavoriteService.getFavoriteByUserId(userID,productID);
    } catch (error) {
        return {result:false, message:"Like Controller Error: "+error}
    }
}
const getFavoriteByUserID = async (userID,limit,skipPage)=>{
    try {
        // console.log(userID, limitData, skipPage);
        let skip = 0;

        if (typeof limitData !== "undefined" && limitData > 0)
          skip = (skipPage - 1) * limitData;
        else {
          if (skipPage == 1) skip = 0;
          else if (skipPage > 1) skip = (skipPage - 1) * 10;
        }
        console.log("page: " + skip);
        return await FavoriteService.getFavorite(userID,limit,skip);
    } catch (error) {
        return {result:false, message:"Like Controller Error: "+error}
    }
}
const deleteFavorite = async (id)=>{
    try {
        return await FavoriteService.deleteFavorite(id);
    } catch (error) {
        return {result:false, message:"Like Controller Error: "+error}
    }
}
module.exports={
    deleteFavorite,
    addFavorite,
    getFavoriteByUserID,
    getFavoriteByFeedbackId
}