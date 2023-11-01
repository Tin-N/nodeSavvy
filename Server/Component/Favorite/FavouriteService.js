const { json } = require('express');
const favoriteModel= require('./FavoriteModel');

const addFavorite = async (userID,productID)=>{
    try {

        const check= await favoriteModel.findOne({productID:productID,userID:userID}).exec();
        console.log(check);
        if(!check){
        const favorite = {productID:productID,userID:userID};
        const newFavorite= new favoriteModel(favorite);
        return await newFavorite.save();
    }
        return {}
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
        const check= await favoriteModel.findOne({productID:productID,userID:userID}).exec();
        console.log(check);
                // console.log(">>>>>>>>>>>>>>>,",result,userID,productID);
        return check;
    } catch (error) {
        return json({return:false, message:"Error at service: "+error})
    }
}
module.exports={
    addFavorite,
    deleteFavorite,
    getFavoriteByUserId
}