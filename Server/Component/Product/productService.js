const productModel = require('./productModel');
const addProduct = async (
    userID, categoryID, price,
    detail, image, isApproved,
    name, quantity, sold, rating, options) => {
    try {
        const newProduct = {
            userID, categoryID,
            price, detail, image,
            isApproved, name, quantity, sold, rating, options
        };
        const newP = new productModel(newProduct);
        await newP.save();
    } catch (err) {
        console.log("Lỗi không thêm được: " + err);
        return false;
    }
}
const addOption = async (
    productID,
    title, titleColor, color, size, weight, imageOption) => {
    try {
        const newO = await productModel.updateOne({
            _id: productID
        }, {
            $push: {
                options: {
                    title: title,
                    titleColor: titleColor,
                    color: color, size: size,
                    weight: weight,
                    imageOption: imageOption
                }
            }
        });
        console.log(newO);

        if (newO.modifiedCount === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Lỗi không thêm được: " + error);
        return false;
    }
}
const getAllProductByUserID = async (id) => {
    try {
        return await productModel.find({userID: id});
    } catch (error) {
        console.log('getAllProductByUserID error: ' + error);
    }
}
module.exports = { addProduct, addOption, getAllProductByUserID }