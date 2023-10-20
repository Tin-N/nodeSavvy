const { json } = require('express');
const favoriteModel= require('./FavoriteModel');

const addFavorite = async (productID,userID)=>{
    try {
        const favorite = {productID:productID,userID:userID};
        const newFavorite= new favoriteModel(favorite);
        return await newFavorite.save();
    } catch (error) {
        return json({return:false, message:"Error at service: "+error})
    }
}

const deleteFavorite = async (id)=>{
    try {
        
        return await favoriteModel.findByIdAndDelete(id);
    } catch (error) {
        return json({return:false, message:"Error at service: "+error})
    }
}
const getFavoriteByUserId = async (userID,productID)=>{
    try {
        
        return await favoriteModel.find({userID:userID,productID:productID});
    } catch (error) {
        return json({return:false, message:"Error at service: "+error})
    }
}
module.exports={
    addFavorite,
    deleteFavorite,
    getFavoriteByUserId
}