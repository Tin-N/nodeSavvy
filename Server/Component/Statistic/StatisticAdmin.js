const productModel = require("../Product/productModel");
const FeedbackModel = require("../Feedback/feedbackModel");
const orderDetailsModel = require("../Order/orderDetailsModel");
const { MongoClient, ObjectId } = require('mongodb');
const userModel= require('../User/UserModel');
const getStatisticRevenueByWeek = async () => {
    try {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      console.log(sevenDaysAgo);
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(sevenDaysAgo)],
            },
          },
        },
         {$sort:{_id:1}},
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.deliveryStatus": "Delivered",
          },
        }
        , {$sort:{orderDetailID:1}},
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
        }

      ]);
      const result1 = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(sevenDaysAgo)],
            },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.deliveryStatus": "Delivered",
          },
        },
  
        {
          $group: {
            _id: 0,
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
      return {week:result,total:result1};
    } catch (err) {
      console.log("Không lấy thống kê được(Ser): " + err);
      return false;
    }
  };
  const getStatisticRevenueByMonth = async () => {
    try {
      const now = new Date();
      const aMonthAgo = new Date(now.getTime() -  30 * 24 * 60 * 60 * 1000);
      console.log(aMonthAgo);
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(aMonthAgo)],
            },
          },
        },
        
        {
          $sort: { orderDetailID: -1 }, // Sắp xếp theo trường "_id" tăng dần trước khi áp dụng $project
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.deliveryStatus": "Delivered",
          },
        },
        {
          $group: {
            _id: 
            {
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
      const result1 = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(aMonthAgo)],
            },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.deliveryStatus": "Delivered",
          },
        },
        
        {
          $group: {
            _id: 0,
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
      return {month:result,total:result1};
    } catch (err) {
      console.log("Không lấy thống kê được(Ser): " + err);
      return false;
    }
  };
  const getStatisticRevenueByYear = async () => {
    try {
      const now = new Date();
      const aYearAgo = new Date(now.getTime() -  365 * 24 * 60 * 60 * 1000);
      console.log(aYearAgo);
      const result = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(aYearAgo)],
            },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.deliveryStatus": "Delivered",
          },
        },
        {$sort:{_id:1}},

       
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
        },
        
      ]);
      const result1 = await orderDetailsModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$orderDetailID" }, new Date(aYearAgo)],
            },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.deliveryStatus": "Delivered",
          },
        },
  
        {
          $group: {
            _id: 0,
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
      return {year:result,total:result1};
    } catch (err) {
      console.log("Không lấy thống kê năm được(Ser): " + err);
      return false;
    }
  };
const getStatisticUserByWeek = async () => {
    try {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
           const result = await userModel.aggregate([
            {$sort:{_id:-1}}
            ,
        {
          
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(sevenDaysAgo)],
            },
          },
        }
  ,
       
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d/%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                date: "$_id",
                timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
              },
            },
            numberOfUsers: { $count: {} },
          },
        },
      
        {
            $project: {
                _id: 0, // 0 để ẩn trường _id
                label: "$_id",
                value: "$numberOfUsers",
            },
        },
        
      ]);
      return result;
    } catch (err) {
        console.log("Không lấy thống kê được(Ser): " + err);
        return false;
    }
}
const getStatisticUserByMonth = async () => {
    try {
        const now = new Date();
      const aMonthAgo = new Date(now.getTime() -  30 * 24 * 60 * 60 * 1000);
           const result = await userModel.aggregate([
            // {$sort:{_id:1}}
            // ,
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aMonthAgo)],
            },
          },
        },
        { $sort: { _id: -1 } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d/%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                date: "$_id",
                timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
              },
            },
            numberOfUsers: {  $count: {} },
          },
        },
        {
            $project: {
                _id: 0, // 0 để ẩn trường _id
                label: "$_id",
                value: "$numberOfUsers",
            },
        },
      ]);
      return result;
    } catch (err) {
        console.log("Không lấy thống kê được(Ser): " + err);
        return false;
    }
}
const getStatisticUserByYear = async () => {
    try {
        const now = new Date();
      const aYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
           const result = await userModel.aggregate([
            {$sort:{_id:-1}}
        ,
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aYearAgo)],
            },
          },
        },
        {
          $sort:{
            _id:-1
          }
        },
        {
          $group: {
            
            _id: {
              $dateToString: {
                format: "%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                date: "$_id",
                // timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
              },
            },
            numberOfUsers: {  $count: {} },
          },
        },  
        // { $sort: { _id: -1 } },
        {
            $project: {
                _id: "$id", // 0 để ẩn trường _id
                label: "$_id",
                value: "$numberOfUsers",
            },
        },
      ]);
      return result;
    } catch (err) {
        console.log("Không lấy thống kê được(Ser): " + err);
        return false;
    }
}
const getTotalUser = async () => {
    try {
        const now = new Date();
      const aYearAgo = new Date(now.getTime() -  365 * 24 * 60 * 60 * 1000);
//            const result = await orderDetailsModel.aggregate([
//         {
//           $match: {
//             $expr: {
//               $gte: [{ $toDate: "$_id" }, new Date(aYearAgo)],
//             },
//           },
//         }
//   ,
//         {
//             $group: {
//                 _id: {
//                   $dateToString: {
//                     format: "%Y", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
//                     date: "$_id",
//                     timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
//                   },
//                 },
//                 numberOfUsers: { $count: {} },
//               },
//         },
        
//       ]);
        const result = await userModel.find().count();
      return result;
    } catch (err) {
        console.log("Không lấy thống kê được(Ser): " + err);
        return false;
    }
}
const getTotalUserByYear = async () => {
    try {
        const now = new Date();
      const aYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
           const result = await userModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aYearAgo)],
            },
          },
        }
        ,
        {
            $group: {
                _id:0,
                // _id: {
                //   $dateToString: {
                //     format: "%m", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                //     date: "$_id",
                //     timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
                //   },
                // },
                numberOfUsers: { $count: {} },
              },
        },
        
      ]);
      return result;
    } catch (err) {
        console.log("Không lấy thống kê được(Ser): " + err);
        return false;
    }
}
const getTotalUserByMonth = async () => {
    try {
        const now = new Date();
      const aYearAgo = new Date(now.getTime() -  30 * 24 * 60 * 60 * 1000);
           const result = await userModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aYearAgo)],
            },
          },
        }
  ,
        {
            $group: {
                _id:0,
                // _id: {
                //   $dateToString: {
                //     format: "%m-%d", // Đối với tuần "%U", tháng "%Y-%m", năm "%Y"
                //     date: "$_id",
                //     timezone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ theo yêu cầu
                //   },
                // },
                numberOfUsers: { $count: {} },
              },
        },
        
      ]);
      return result;
    } catch (err) {
        console.log("Không lấy thống kê được(Ser): " + err);
        return false;
    }
}
const getTotalUserByWeek = async () => {
    try {
        const now = new Date();
      const aYearAgo = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000);
           const result = await userModel.aggregate([
        {
          $match: {
            $expr: {
              $gte: [{ $toDate: "$_id" }, new Date(aYearAgo)],
            },
          },
        }
  ,
        {
            $group: {
                _id:0,
                numberOfUsers: { $count: {} },
              },
        },
        
      ]);
      return result;
    } catch (err) {
        console.log("Không lấy thống kê được(Ser): " + err);
        return false;
    }
}
module.exports = {
   
    getStatisticRevenueByWeek,
    getStatisticRevenueByMonth,
    getStatisticRevenueByYear,

    getStatisticUserByWeek,
    getStatisticUserByMonth,
    getStatisticUserByYear,

    getTotalUser,
    getTotalUserByYear,
    getTotalUserByMonth,
    getTotalUserByWeek
  };