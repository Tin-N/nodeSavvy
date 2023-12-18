const productModel = require("../Product/productModel");
const FeedbackModel = require("../Feedback/feedbackModel");
const orderDetailsModel = require("../Order/orderDetailsModel");
const mongoose = require("mongoose");
const feedbackModel = require("../Feedback/feedbackModel");
const Schema = mongoose.Schema;
const { MongoClient, ObjectId } = require('mongodb');
const getStatisticRevenueByWeek = async (ownerID) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7*24 * 60 * 60 * 1000);
    console.log(sevenDaysAgo);
    if (ownerID) {
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(sevenDaysAgo)],
            },
          },
        },
        { $sort: { orderDetailID: -1 } }
        ,
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID) ,
            "products.deliveryStatus": "Delivered",
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d/%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                date: "$orderDetailID",
                timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
              },
            },
            totalDeliveredCost: { $sum: "$products.itemTotalCost" },
          },
        }
        ,
        {
          $project: {
              _id: 0, // 0 để ẩn trường _id
              label: "$_id",
              value: "$totalDeliveredCost",
          },
      },
      ]);
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Không lấy thống kê được(Ser): " + err);
    return false;
  }
};
const getStatisticRevenueByMonth = async (ownerID) => {
  try {
    const now = new Date();
    const aMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    console.log(aMonthAgo);
    if (typeof ownerID !== "undefined") {
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(aMonthAgo)],
            },
          },
        },
        { $sort: { orderDetailID: -1 } }
        ,
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            "products.deliveryStatus": "Delivered",
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d/%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                date: "$orderDetailID",
                timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
              },
            },
            totalDeliveredCost: { $sum: "$products.itemTotalCost" },
          },
        },
        {
          $project: {
              _id: 0, // 0 để ẩn trường _id
              label: "$_id",
              value: "$totalDeliveredCost",
          },
      },
        
      ]);
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Không lấy thống kê được(Ser): " + err);
    return false;
  }
};
const getStatisticRevenueByYear = async (ownerID) => {
  try {
    const now = new Date();
    const aYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    console.log(aYearAgo);
    if (typeof ownerID !== "undefined") {
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(aYearAgo)],
            },
          },
        },
        { $sort: { orderDetailID: 1 } }
        ,
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            "products.deliveryStatus": "Delivered",
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                date: "$orderDetailID",
                timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
              },
            },
            totalDeliveredCost: { $sum: "$products.itemTotalCost" },
          },
        },
        {
          $project: {
              _id: 0, // 0 để ẩn trường _id
              label: "$_id",
              value: "$totalDeliveredCost",
          },
      }
      ]);
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Không lấy thống kê năm được(Ser): " + err);
    return false;
  }
};
const getTotalRevenueByWeek = async (ownerID) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7*24 * 60 * 60 * 1000);
    console.log(sevenDaysAgo,ownerID);
    if (ownerID) {
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(sevenDaysAgo)],
            },
          },
        },
        {$sort:{_id:1}},
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            "products.deliveryStatus": "Delivered",
          },
        },
        {
          $group: {
            _id: 0,
            totalProduct: { $count: {} },
            totalDeliveredCost: { $sum: "$products.itemTotalCost" },
          },
        },
        
        
      ]);    
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Không lấy thống kê được(Ser): " + err);
    return false;
  }
};
const getTotalRevenueByMonth = async (ownerID) => {
  try {
    const now = new Date();
    const aMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    console.log(aMonthAgo);
    if (typeof ownerID !== "undefined") {
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aMonthAgo)],
            },
          },
        },
        {$sort:{_id:1}},
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            "products.deliveryStatus": "Delivered",
          },
        },
        { $sort: { _id: -1 } }
        ,
        {
          $group: {
            _id: 0,
            totalProduct: { $count: {} },
            totalDeliveredCost: { $sum: "$products.itemTotalCost" },
          },
        },

      ]);
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Không lấy thống kê được(Ser): " + err);
    return false;
  }
};
const getTotalRevenueByYear = async (ownerID) => {
  try {
    const now = new Date();
    const aMonthAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    console.log(aMonthAgo);
    if (typeof ownerID !== "undefined") {
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aMonthAgo)],
            },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            "products.deliveryStatus": "Delivered",
          },
        },
        {
          $group: {
            //   _id: {
            //     $dateToString: {
            //       format: "%d/%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
            //       date: "$_id",
            //       timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
            //     },
            //   },
            _id: 0,
            totalProduct: { $count: {} },
            totalDeliveredCost: { $sum: "$products.itemTotalCost" },
          },
        },
      ]);
      return result;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Không lấy thống kê năm được(Ser): " + err);
    return false;
  }
};
const getTopRatedByProductByWeek = async (ownerID) => {
  try {
    if (typeof ownerID !== "undefined") {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      console.log(sevenDaysAgo);
      const result = await feedbackModel.aggregate([
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(sevenDaysAgo)],
            },
          }
        },
        {
          $group: {
            _id: { $toObjectId: "$productID" },
            rating: {
              $avg: "$rating",
            },
          },
        },
        {
          $sort: {
            rating: -1,
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo",
          },
        }, {
          $limit: 10
        }
      ]); return result;

    } else {
      return [];
    }

  } catch (err) {
    console.log("Không lấy được top sản phẩm đánh giá tốt được(Ser): " + err);
    return false;
  }
};
const getTopRatedByProductByMonth = async (ownerID) => {
  try {
    if (typeof ownerID !== "undefined") {
      const now = new Date();
      const aMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      console.log(aMonthAgo);
      const result = await feedbackModel.aggregate([
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aMonthAgo)],
            },
          }
        },
        {
          $group: {
            _id: { $toObjectId: "$productID" },
            rating: {
              $avg: "$rating",
            },
          },
        },
        {
          $sort: {
            rating: -1,
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo",
          },
        }, {
          $limit: 10
        }
      ]); return result;

    } else {
      return [];
    }

  } catch (err) {
    console.log("Không lấy được top sản phẩm đánh giá tốt được(Ser): " + err);
    return false;
  }
};
const getTopRatedByProductByYear = async (ownerID) => {
  try {
    if (typeof ownerID !== "undefined") {
      const now = new Date();
      const aYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      console.log(aYearAgo);
      const result = await feedbackModel.aggregate([
        {
          $match: {
            "products.ownerID": new ObjectId(ownerID),
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aYearAgo)],
            },
          }
        },
        {
          $group: {
            _id: { $toObjectId: "$productID" },
            rating: {
              $avg: "$rating",
            },
          },
        },
        {
          $sort: {
            rating: -1,
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo",
          },
        }, {
          $limit: 10
        }
      ]); return result;

    } else {
      return [];
    }

  } catch (err) {
    console.log("Không lấy được top sản phẩm đánh giá tốt được(Ser): " + err);
    return false;
  }
};
module.exports = {
  getTopRatedByProductByWeek,
  getTopRatedByProductByYear,
  getTopRatedByProductByMonth,
  getStatisticRevenueByWeek,
  getStatisticRevenueByMonth,
  getStatisticRevenueByYear,
  getTotalRevenueByMonth,
  getTotalRevenueByWeek,
  getTotalRevenueByYear
};
