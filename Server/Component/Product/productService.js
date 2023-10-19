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
const getProductByID = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (error) {
        console.log('getProductByID error: ' + error);
    }
}

const getProductByCategoryID = async (categoryID,limitData,skipPage) => {
    try {
        // let page=0
        // if (limitData<=2) 
        //     page=0;
        // else
        //     page=24*skipPage;
        console.log(categoryID);
        return await productModel.find({categoryID:categoryID}).limit(limitData).skip(skipPage);
    } catch (error) {
        console.log('getAllProductByUserID error: ' + error);
    }
}

const getAllProductByUserIDByPage = async (userID,limitData,skipPage) => {
    try {
        // let page=0
        // if (limitData<=2) 
        //     page=0;
        // else
        //     page=24*skipPage;
        console.log(categoryID);
        return await productModel.find({userID:userID}).limit(limitData).skip(skipPage);
    } catch (error) {
        console.log('getAllProductByUserID error: ' + error);
    }
}

const searchByName = async (name,limitData) => {
    try {
        // let page=0
        // if (limitData<=2) 
        //     page=0;
        // else
        //     page=24*skipPage;
        console.error(name,limitData);
        
        return await productModel.find({name: { $regex: name, $options: "i" }}).limit(limitData);
    } catch (error) {
        console.log('searchByName error: ' + error);
    }
}
module.exports = { 
    searchByName,
    addProduct,
    addOption,
    getAllProductByUserID,
    getProductByID,
    getProductByCategoryID,
    getAllProductByUserIDByPage

}