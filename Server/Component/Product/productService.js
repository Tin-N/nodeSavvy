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
const FilterProduct = async (
  categoryID,
  skipData,
  limitData,
  sortName,
  sortPrice,
  sortRating,
  lte,
  gte
) => {
  try {
    // let page=0
    // if (limitData<=2)
    //     page=0;
    // else
    //     page=24*skipPage;
    // console.error(name,limitData);
    const option = [
      {
        $match: {
          price: {
            $lte: lte ? lte : Number.MAX_VALUE,
            $gte: gte ? gte : 0,
          },
        },
      },
    ];

    if (sortName) {
      option.push({
        $sort: {
          name: sortName,
        },
      });
    }

    if (sortPrice) {
      option.push({
        $sort: {
          sold: sortPrice,
        },
      });
    }

    if (sortRating) {
      option.push({
        $sort: {
          rating: sortRating,
        },
      });
    }

    if (categoryID) {
      option[0].$match.categoryID = categoryID;
    }
    return await productModel
      .aggregate(option)
      .limit(limitData ? limitData : 30)
      .skip(skipData ? skipData : 0);
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
        return await productModel.findByIdAndDelete(id);
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
module.exports = {
  FilterProduct,
    searchByName,
    addProduct,
    addOption,
    getAllProductByUserID,
    getProductByID,
    getProductByCategoryID,
    getAllProductByUserIDByPage,
    deleteProduct, updateProduct
}
