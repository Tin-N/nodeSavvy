const productModel = require("./productModel");

const MAX_VALUE = 10000000;

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
// >>>>>>> devTin
    }
  // } catch (error) {
  //   console.log("Lỗi không thêm được: " + error);
  //   return false;
  // }
};
const getAllProductByUserID = async (id) => {
  try {
    return await productModel.find({ userID: id });
  } catch (error) {
    console.log("getAllProductByUserID error: " + error);
  }
};


const getProductByID = async (id) => {
  try {
    return await productModel.findById(id);
  } catch (error) {
    console.log("getProductByID error: " + error);
  }
};

const getProductByCategoryID = async (categoryID, limitData, skipPage) => {
  try {
    return await productModel
      .find({ categoryID: categoryID })
      .limit(limitData)
      .skip(skipPage);
  } catch (error) {
    console.log("getAllProductByUserID error: " + error);
  }
};

const getAllProductByUserIDByPage = async (userID, limitData, skipPage) => {
  try {
    // let page=0
    // if (limitData<=2)
    //     page=0;
    // else
    //     page=24*skipPage;
    console.log(categoryID);
    return await productModel
      .find({ userID: userID })
      .limit(limitData)
      .skip(skipPage);
  } catch (error) {
    console.log("getAllProductByUserID error: " + error);
  }
};

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
    // console.log( 
    //   name,
    //   limitData,
    //   categoryID,
    //   userID,
    //   skipData,
    //   sortName,
    //   sortPrice,
    //   sortRating,
    //   lte,
    //   gte);
    // const option = [
      
    // ];
let sort={}
let searchoriginal= {
  name:{$regex: name, $options: "i"},
  price: {
    $lte: lte ? lte : MAX_VALUE,
    $gte: gte ? gte : 0,
  }
}

    if (sortName) 
      sort={...sort,name: +sortName}
    
    if (sortPrice) 
      sort={...sort,price: +sortPrice}
    

    if (sortRating) 
      sort={...sort,rating: +sortRating}
    
    if (categoryID) 
      searchoriginal={...searchoriginal,categoryID:categoryID};
    if (userID) 
    searchoriginal={...searchoriginal,userID:userID};

    console.log(skipData+"ssssss");
      const result = await productModel
      .find(
        searchoriginal
       ).sort(sort).limit(limitData?limitData:20).skip(skipData);

       const count = await productModel
      .find(
        searchoriginal
       ).sort(sort).count();
       console.log("Page service   "+skipData);
      return {result:result,count:count};
  } catch (error) {
    console.log("searchByName error: " + error);
  }
};


// Filter
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
    // let page=0
    // if (limitData<=2)
    //     page=0;
    // else
    //     page=24*skipPage;
    // console.error(name,limitData);
    let searchoriginal= {
      // name:{$regex: name, $options: "i"},
      // price: {
      //   $lte: lte ? lte : MAX_VALUE,
      //   $gte: gte ? gte : 0,
      // }
    }

   let option={};
    if(name)
      searchoriginal={...searchoriginal,name:{$regex: name, $options: "i"}}
    if (sortNew) {
      option={...option,_id:-1}
    }
    if (sortPrice) {
      option={...option,price:-1}
    }

    if (sortRating) {
      option={...option,rating:-1}
    }
    // if (sortDiscount) {
    //   option={...option,rating:1}
    // }
    const count =await productModel
    .find(searchoriginal).sort(option)
    .count();
    const product=await productModel
    .find(searchoriginal).sort(option)
    .limit(limitData ? limitData : 20)
    .skip(skipData ? skipData : 0)
    return {product:product,count:count};
  } catch (error) {
    console.log("filterProduct error: " + error);
  }
};


// const getProductByCategoryID = async (categoryID, limitData, skipPage) => {
//     try {
//         return await productModel.find({ categoryID: categoryID }).limit(limitData).skip(skipPage);
//     } catch (error) {
//         console.log('getAllProductByUserID error: ' + error);
//     }
// }

// const getAllProductByUserIDByPage = async (userID, limitData, skipPage) => {
//     try {
//         // let page=0
//         // if (limitData<=2) 
//         //     page=0;
//         // else
//         //     page=24*skipPage;
//         console.log(categoryID);
//         return await productModel.find({ userID: userID }).limit(limitData).skip(skipPage);
//     } catch (error) {
//         console.log('getAllProductByUserID error: ' + error);
//     }
// }

const deleteProduct = async (id) => {
    try {
        return await productModel.findByIdAndDelete(id);y
    } catch (error) {
        return json({ return: false, message: "Delete product error(Service): " + error })
    }
}

const updateProduct = async (productID, name, quantity, saleOff) => {
    try {
        const product = await productModel.findById(productID);
        if(product){
            product.name = name ? name: product.name;
            product.quantity = quantity ? quantity: product.quantity;
            product.saleOff = saleOff ? saleOff: product.saleOff;
            await product.save();
            return true;
        }
        return false
    } catch (error) {
        console.log("update product error(Service): " + error);
        return false;
    }
}


//duyet san pham
const checkProductByid = async (id, isApproved) => {
    try {
        const product = await productModel.findById(id);
        if (product) {
            product.isApproved = isApproved ? isApproved : product.isApproved;
            await product.save();
            return true;
        }
        return false;
    } catch (error) {
        console.log('Check product by id error: ', error);
        return false;
    }
}

//lay san pham chua duyet
const getProductNotCensorship = async (isApproved) => {
    try {
        return await productModel.find({ isApproved: 1 })
    } catch (error) {
        console.log("Get product censorship error: ", error);
        return null;
    }
}
module.exports = {
FilterProductByName,
    searchByName,
    addProduct,
    addOption,
    getAllProductByUserID,
    getProductByID,
    getProductByCategoryID,
    getAllProductByUserIDByPage,
    deleteProduct, updateProduct,
    checkProductByid,
    getProductNotCensorship,
}

