const productModel = require('./productModel');
const productService = require('./productService');
const addProduct = async (
    userID, categoryID, price,
    detail, image, isApproved,
    name, quantity, options) => {
    try {
        return await productService.addProduct(
            userID, categoryID, price,
            detail, image, isApproved,
            name, quantity, options
        )
    } catch (err) {
        throw err;
    }
}
const addOption = async (
    productID,
    title, color, titleColor, size, weight, imageOption) => {
    try {
        return await productService.addOption(
            productID,
            title, color, titleColor, size, weight, imageOption)
    } catch (err) {
        console.log('Không thể thêm thuộc tính: ' + err);;
    }
}
const getAllProductByUserID = async (id) => {
    try {
        return await productService.getAllProductByUserID(id);
    } catch (error) {
        console.log('getAllProductByUserID error(contr): '+error);
        return false;
    }
}
module.exports = { addProduct, addOption, getAllProductByUserID }