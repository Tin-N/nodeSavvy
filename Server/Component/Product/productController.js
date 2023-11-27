const productService = require('./productService');

//

const addProduct = async (
  userID,
  categoryID,
  price,
  detail,
  image,
  isApproved,
  name,
  quantity,
  sold,
  rating,
  options
) => {
  try {
    return await productService.addProduct(
      userID,
      categoryID,
      price,
      detail,
      image,
      isApproved,
      name,
      quantity,
      sold,
      rating,
      options
    );
  } catch (err) {
    throw err;
  }
};

//
const addOption = async (
  productID,
  title,
  color,
  titleColor,
  size,
  weight,
  imageOption
) => {
  try {
    return await productService.addOption(
      productID,
      title,
      color,
      titleColor,
      size,
      weight,
      imageOption
    );
  } catch (err) {
    console.log("Không thể thêm thuộc tính: " + err);
  }
};

//
const getAllProductByUserID = async (id) => {

  try {
    return await productService.getAllProductByUserID(id);
  } catch (error) {
    console.log('getAllProductByUserID error(contr): ' + error);
    return false;
  }
}

//

const getAllProductByUserIDAndQuantity = async (id) => {
  try {
    return await productService.getAllProductByUserIDAndQuantity(id);
  } catch (error) {
    console.log('getAllProductByUserIDAndQuantity error(contr): ' + error);
    return false;
  }
}
const getListProductSelling = async (id, isShow, size) => {
  try {
    return await productService.getListProductSelling(id, isShow, size);
  } catch (error) {
    console.log('getListProductSelling error(contr): ' + error);
    return false;
  }
}

// 

const getProductByID = async (id) => {
  try {
    return await productService.getProductByID(id);
  } catch (error) {
    console.log('getProductByID error(contr): ' + error);
    return false;
  }
}

const searchByName = async (
  name,
  limitData,
  categoryID,
  userID,
  skipData,
  sortName,
  sortPrice,
  sortRating,
  lte,
  gte
) => {
  try {
    let skip = 0;

    if (typeof limitData !== "undefined" && limitData > 0)
      skip = (skipData - 1) * limitData;
    else {
      if (skipData == 1) skip = 0;
      else if (skipData > 1) skip = (skipData - 1) * 20;
    }
    console.log("page: " + skip);
    return await productService.searchByName(
      name,
      limitData,
      categoryID,
      userID,
      skip,
      sortName,
      sortPrice,
      sortRating,
      lte,
      gte
    );

  } catch (error) {
    console.log("searchByName error(contr): " + error);
    return false;
  }
};

const FilterProductByName = async (
  name,
  skipData,
  limitData,
  sortNew,
  sortPrice,
  sortRating,
  sortDiscount
) => {
  try {
    let skip = 0;

    if (typeof limitData !== "undefined" && limitData > 0)
      skip = (skipData - 1) * limitData;
    else {
      if (skipData == 1) skip = 0;
      else if (skipData > 1) skip = (skipData - 1) * 20;
    }
    console.log("page: " + skip);
    return await productService.FilterProductByName(
      name,
      skip,
      limitData,
      sortNew,
      sortPrice,
      sortRating, sortDiscount
    );
  } catch (error) {
    console.log("searchByName error(contr): " + error);
    return false;
  }
};

const getProductByCategoryID = async (categoryID, limitData, skipPage,sortName, sortPrice, sortRating, lte, gte) => {
    try {
        console.log(categoryID, limitData, skipPage);
        let skip = 0;

        if (typeof limitData !== "undefined" && limitData > 0)
          skip = (skipPage - 1) * limitData;
        else {
          if (skipPage == 1) skip = 0;
          else if (skipPage > 1) skip = (skipPage - 1) * 20;
        }
        console.log("page: " + skip);
        return await productService.getProductByCategoryID(categoryID, limitData, skip,sortName, sortPrice, sortRating, lte, gte);
    } catch (error) {
        console.log('getProductByCategoryID error(contr): ' + error);
        return false;
    }
}
const getAllProductByUserIDByPage = async (userID, limitData, skipPage) => {
  try {
    console.log(userID, limitData, skipPage);
    return await productService.getProductByCategoryID(userID, limitData, skipPage);
  } catch (error) {
    console.log('getAllProductByUserIDByPage error(contr): ' + error);
    return false;
  }
}


const deleteProduct = async (productID, isShow) => {

  try {
    return await productService.deleteProduct(productID, isShow);
  } catch (error) {
    return json({ return: false, message: "Delete product error(Contr): " + error })
  }
}
const updateQuantityProductForCustomer = async (productID, quantity) => {
  try {
    return await productService.updateQuantityProductForCustomer(productID, quantity);
  } catch (error) {
    return json({ return: false, message: "Update quantity error(Contr): " + error })
  }
}
const updateSoldProduct = async (productID, sold) => {
  try {
    return await productService.updateSoldProduct(productID, sold);
  } catch (error) {
    return json({ return: false, message: "Update sold error(Contr): " + error })
  }
}
const updateQuantityProduct = async (productID, quantity) => {
  try {
    return await productService.updateQuantityProduct(productID, quantity);
  } catch (error) {
    return false;
  }
}

const updateProduct = async (productID, name, price, detail, categoryID, saleOffID) => {
  try {
    return await productService.updateProduct(productID, name, price, detail, categoryID, saleOffID);
  } catch (error) {
    return false;
  }
}


const checkProductByid = async (id, isApproved) => {
  try {
    return await productService.checkProductByid(id, isApproved);
  } catch (error) {
    return false;
  }
}

const getProductNotCensorship = async (isApproved) => {
  try {
    return await productService.getProductNotCensorship(isApproved);
  } catch (error) {
    console.log("Get product censorship error: ", error);
  }
  return null
}

module.exports = {
  FilterProductByName,
  addProduct,
  addOption, getAllProductByUserID,
  getProductByID, getProductByCategoryID,
  getAllProductByUserIDByPage, searchByName,
  checkProductByid,
  getProductNotCensorship,
  deleteProduct, updateProduct,
  getAllProductByUserID,
  getProductByID, getProductByCategoryID,
  getAllProductByUserIDByPage, searchByName,
  getListProductSelling,
  updateQuantityProductForCustomer, updateSoldProduct,
  getAllProductByUserIDAndQuantity, updateQuantityProduct
}

