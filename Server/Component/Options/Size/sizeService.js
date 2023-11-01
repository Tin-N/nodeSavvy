const { json } = require('express');
const sizeModel = require('./sizeModel');
const addsize = async (sizeArray) => {
    try {
        for (let i = 0; i < sizeArray.length; i++) {
            console.log(sizeArray[i]);
        }
        const result = await sizeModel.insertMany(sizeArray)
        // const newColor = new colorModel(color1);
        console.log(sizeArray + "Đây là vcl" + result);
        return result
    } catch (error) {
        return json({ return: false, message: "Service Error: " + error })
    }
}

const deleteSize = async (id) => {
    try {

        return await sizeModel.findByIdAndDelete(id);
    } catch (error) {
        return json({ return: false, message: "Service Error: " + error })
    }
}
const getSizeByProductId = async (productID) => {
    try {
        return await sizeModel.find({ productID: productID });
    } catch (error) {
        return json({ return: false, message: "Service Error: " + error })
    }
}
module.exports = {
    deleteSize,
    addsize,
    getSizeByProductId
}