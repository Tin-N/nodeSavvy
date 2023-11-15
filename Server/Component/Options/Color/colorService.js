const { json } = require('express');
const colorModel = require('./colorModel');
const addColor = async (colorArray) => {
    try {
        for(let i=0;i<colorArray.length;i++){
            console.log(colorArray[i]);
        }
        const result = await colorModel.insertMany(colorArray)
        // const newColor = new colorModel(color1);
        console.log(colorArray + "Đây là vcl" + result);
        return result
    } catch (error) {
        return json({ return: false, message: "Service Error: " + error })
    }
}

const deleteColor = async (id) => {
    try {

        return await colorModel.findByIdAndDelete(id);
    } catch (error) {
        return json({ return: false, message: "Service Error: " + error })
    }
}
const deleteManyColor = async (id) => {
    try {

        return await colorModel.findByIdAndDelete(id);
    } catch (error) {
        return json({ return: false, message: "Service Error: " + error })
    }
}
const getColorByProductId = async (productID) => {
    try {
        console.log(productID);
        return await colorModel.find({ productID: productID });
    } catch (error) {
        return json({ return: false, message: "Service Error: " + error })
    }
}
module.exports = {
    deleteColor,
    addColor,
    getColorByProductId

}