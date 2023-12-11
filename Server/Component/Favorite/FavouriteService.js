const { json } = require("express");
const favoriteModel = require("./FavoriteModel");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const addFavorite = async (userID, productID) => {
  try {
    const check = await favoriteModel
      .findOne({ productID: productID, userID: userID })
      .exec();
    console.log(check);
    if (!check) {
      const favorite = { productID: productID, userID: userID };
      const newFavorite = new favoriteModel(favorite);
      return await newFavorite.save();
    }
    return {};
  } catch (error) {
    return json({ return: false, message: "Error at service: " + error });
  }
};

const deleteFavorite = async (id) => {
  try {
    return await favoriteModel.findByIdAndDelete(id);
  } catch (error) {
    return json({ return: false, message: "Error at service: " + error });
  }
};
const getFavoriteByUserId = async (userID, productID) => {
  try {
    const check = await favoriteModel
      .findOne({ productID: productID, userID: userID })
      .exec();
    // console.log(">>>>>>>>>>>>>>>,",result,userID,productID);
    return check;
  } catch (error) {
    return json({ return: false, message: "Error at service: " + error });
  }
};
const getFavorite = async (userID, limit, skip) => {
  try {
    const check = await favoriteModel.aggregate([
        {
            $match: {
                userID: userID,
            },
        },
        {
            $limit: limit ? limit : 10,
        },
        {
            $sort: {
                _id: 1,
            },
        },
        {
            $skip: skip,
        },
        {
            $lookup: {
                from: "products",
                let: { searchId: { $toObjectId: "$productID" } },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$searchId"],
                            },
                        },
                    },
                ],
    
                as: "productInfo",
            },
        },
    ]);
    
    const count = await favoriteModel.find({ userID: userID }).count();
    console.log(check);

    return { result: check, count: count };
  } catch (error) {
    return { return: false, message: "Error at service: " + error };
  }
};
module.exports = {
  addFavorite,
  deleteFavorite,
  getFavoriteByUserId,
  getFavorite,
};
