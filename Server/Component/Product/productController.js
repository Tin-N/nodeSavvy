const productService = require('./productService');


//  
const addProduct = async (
    userID, categoryID, price,
    detail, image, isApproved,
    name, quantity, sold, rating, options) => {
    try {
        return await productService.addProduct(
            userID, categoryID, price,
            detail, image, isApproved,
            name, quantity, sold, rating, options
        )
    } catch (err) {
        throw err;
    }
}


// 
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

// 
const getAllProductByUserID = async (id) => {
    try {
        return await productService.getAllProductByUserID(id);
    } catch (error) {
        console.log('getAllProductByUserID error(contr): '+error);
        return false;
    }
}


// 
const getProductByID = async (id) => {
    try {
        return await productService.getProductByID(id);
    } catch (error) {
        console.log('getProductByID error(contr): '+error);
        return false;
    }
}



const getProductByCategoryID = async (categoryID,limitData,skipPage) => {
    try {
        console.log(categoryID,limitData,skipPage);

        let page=0;
        // if(limitData<24)
            page=10*skipPage;
        return await productService.getProductByCategoryID(categoryID,limitData,page);
    } catch (error) {
        console.log('getProductByCategoryID error(contr): '+error);
        return false;
    }
}
const getAllProductByUserIDByPage = async (userID,limitData,skipPage) => {
    try {
        console.log(userID,limitData,skipPage);
        return await productService.getProductByCategoryID(userID,limitData,skipPage);
    } catch (error) {
        console.log('getAllProductByUserIDByPage error(contr): '+error);
        return false;
    }
}
const searchByName = async (name,limitData) => {
    try {

        return await productService.searchByName(name,limitData);
    } catch (error) {
        console.log('searchByName error(contr): '+error);
        return false;
    }
}
module.exports = { addProduct, addOption, getAllProductByUserID,getProductByID,getProductByCategoryID,getAllProductByUserIDByPage,searchByName }