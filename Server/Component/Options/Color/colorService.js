const { json } = require('express');
const colorModel=require('./colorModel');
const addColor = async (productID,color,title,image) =>{
    try {
        const color1 = {productID:productID,color:color,title:title,image:image}
        const newColor = new colorModel(color1);
        return await newColor.save();
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}

const deleteColor = async (id) =>{
    try {
       
        return await colorModel.findByIdAndDelete(id);
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}
const getColorByProductId = async (productID) =>{
    try {
        console.log(productID);
        return await colorModel.find({productID:productID});
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}
module.exports={
    deleteColor,
    addColor,
    getColorByProductId
    
}