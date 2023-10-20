const { json } = require('express');
const sizeModel=require('./sizeModel');
const addsize = async (productID,size) =>{
    try {
        const size1 = {productID:productID,size:size}
        const newSize = new sizeModel(size1);
        return await newSize.save();
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}

const deleteSize = async (id) =>{
    try {
       
        return await sizeModel.findByIdAndDelete(id);
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}
const getSizeByProductId = async (productID) =>{
    try {
        return await sizeModel.find({productID:productID});
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}
module.exports={
    deleteSize,
    addsize,
    getSizeByProductId
    
}