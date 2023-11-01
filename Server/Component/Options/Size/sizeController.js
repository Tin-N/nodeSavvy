const sizeService = require('./sizeService');
const addSize = async (sizeArray) =>{
    try {  
        return await sizeService.addsize(sizeArray);
    } catch (error) {
        return json({return:false, message:"Controller Error: "+error})
    }
}
const deleteSize = async (id) =>{
    try {
       
        return await sizeService.deleteSize(id);
    } catch (error) {
        return json({return:false, message:"Controller Error: "+error})
    }
}
const getSizeByProductId = async (productID) =>{
    try {
        return await sizeService.getSizeByProductId(productID);
    } catch (error) {
        return json({return:false, message:"Controller Error: "+error})
    }
}
module.exports={
    deleteSize,
    addSize,
    getSizeByProductId
}