const colorService = require('./colorService');
const addColor = async (colorArray) =>{
    try {
       
        return await colorService.addColor(colorArray);
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}

const deleteColor = async (id) =>{
    try {
       
        return await colorService.deleteColor(id);
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}
const getColorByProductId = async (productID) =>{
    try {
        console.log(productID);
        return await colorService.getColorByProductId(productID);
    } catch (error) {
        return json({return:false, message:"Service Error: "+error})
    }
}
module.exports={
    deleteColor,
    addColor,
    getColorByProductId
}