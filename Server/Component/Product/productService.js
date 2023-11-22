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
        return await newP.save();
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
        return await productModel.find({ userID: id });
    } catch (error) {
        console.log('getAllProductByUserID error: ' + error);
    }
}
const getAllProductByUserIDAndQuantity = async (id) => {
    try {
        return await productModel.find({ userID: id,  quantity: { $lt: 5 } });
    } catch (error) {
        console.log('getAllProductByUserIDAndQuantity error: ' + error);
    }
}

const getListProductSelling = async (id, isShow, size) => {
    try {
        return await productModel.find({ userID: id, isShow: isShow}).limit(size);
    } catch (error) {
        console.log('getListProductSelling error (Ser): ' + error);
    }
}

const getProductByID = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (error) {
        console.log('getProductByID error: ' + error);
    }
}

const getProductByCategoryID = async (categoryID, limitData, skipPage) => {
    try {
        return await productModel.find({ categoryID: categoryID }).limit(limitData).skip(skipPage);
    } catch (error) {
        console.log('getAllProductByUserID error: ' + error);
    }
}

const getAllProductByUserIDByPage = async (userID, limitData, skipPage) => {
    try {
        // let page=0
        // if (limitData<=2) 
        //     page=0;
        // else
        //     page=24*skipPage;
        console.log(categoryID);
        return await productModel.find({ userID: userID }).limit(limitData).skip(skipPage);
    } catch (error) {
        console.log('getAllProductByUserID error: ' + error);
    }
}

const searchByName = async (name, limitData) => {
    try {
        // let page=0
        // if (limitData<=2) 
        //     page=0;
        // else
        //     page=24*skipPage;
        console.error(name, limitData);

        return await productModel.find({ name: { $regex: name, $options: "i" } }).limit(limitData);
    } catch (error) {
        console.log('searchByName error: ' + error);
    }
}

const deleteProduct = async (productID, isShow) => {
    try {
        const result = await productModel.findByIdAndUpdate(
            productID,
            { $set: { isShow: isShow } },
            { new: true }
        );
        return result !== null;
    } catch (error) {
        console.log("Delete product error(Service): " + error);
        return false;
    }
}

const updateQuantityProductForCustomer = async (productID, quantity) => {
    try {
        const result = await productModel.findByIdAndUpdate(
            productID,
            { $inc: { quantity: -quantity } },
            { new: true }
        );
        return result !== null;
    } catch (error) {
        console.log("Update quantity error(Service): " + error);
        return false;
    }
}
const updateQuantityProduct = async (productID, quantity) => {
    try {
        const result = await productModel.findByIdAndUpdate(
            productID,
            { quantity: quantity  },
            { new: true }
        );
        return result !== null;
    } catch (error) {
        console.log("Update quantity error(Service): " + error);
        return false;
    }
}
const updateSoldProduct = async (productID, sold) => {
    try {
        const result = await productModel.findByIdAndUpdate(
            productID,
            { $inc: { sold: sold } },
            { new: true }
        );
        return result !== null;
    } catch (error) {
        console.log("Update sold error(Service): " + error);
        return false;
    }
}

const updateProduct = async (productID, name, price, detail, categoryID) => {
    try {
        const product = await productModel.findById(productID);
        if (product) {
            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
            product.detail = detail ? detail : product.detail;
            product.categoryID = categoryID ? categoryID : product.categoryID;
            await product.save();
            return true;
        }
        return false
    } catch (error) {
        console.log("update product error(Service): " + error);
        return false;
    }
}

module.exports = {
    searchByName,
    addProduct,
    addOption,
    getAllProductByUserID,
    getProductByID,
    getProductByCategoryID,
    getAllProductByUserIDByPage,
    deleteProduct, updateProduct, getListProductSelling,
    updateQuantityProductForCustomer, updateSoldProduct
    ,updateQuantityProduct, getAllProductByUserIDAndQuantity
}