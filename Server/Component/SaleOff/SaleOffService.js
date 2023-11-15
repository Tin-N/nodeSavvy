const saleOffModel = require("./SaleOffModel");
const addSaleOff = async (
  userID,
  titleSale,
  productID,
  saleOff,
  startDay,
  endDay
) => {
  try {
    const newSaleOff = {
      userID,
      titleSale,
      productID,
      saleOff,
      startDay,
      endDay,
    };
    const newS = new saleOffModel(newSaleOff);
    return await newS.save();
  } catch (err) {
    console.log("Không thể cập nhật giá Sale(Ser): " + err);
    return false;
  }
};

const getSaleOffCurrent = async (productID) => {
    try {
      const now = new Date();
      const threeDaysLater = new Date(now).setDate(now.getDate() + 3);
      const sales = await saleOffModel.aggregate([
        {
          $match: {
            productID: productID,
          },
        },
       
        {
          $project: {
            startDay: {
              $cond: {
                if: {
                  $or: [
                    {
                      $and: [
                        { $lt: ["$startDay", threeDaysLater] },
                        { $gte: ["$startDay", now.getTime()] }
                      ]
                    },
                    {
                      $and: [
                        { $gte: ["$endDay", now.getTime()] },
                        { $lt: ["$startDay", now.getTime()] }
                      ]
                    }
                  ]
                },
                then: "$startDay",
                else: null, // or any other default value you want
              },
            },
            endDay:"$endDay",
            productID:"$productID",
            saleOff:"$saleOff",
          },
        },
        {
          $match: {
            startDay: { $ne: null }
          }
        },
        {
            $sort:{
                startDay:1
            }
        },
            {
            $limit: 1
          },
      ]);
  
      return sales;
    } catch (err) {
      console.log("Không thể cập nhật giá Sale(Ser): " + err);
      return false;
    }
  };
  

   
const getSaleOffByProduct = async (productID, page, size) => {
  try {
    const sales = await saleOffModel
      .find({ productID: productID })
      .limit(size)
      .page(page);
    return sales;
  } catch (err) {
    console.log("Không thể cập nhật giá Sale(Ser): " + err);
    return false;
  }
};
module.exports = { addSaleOff, getSaleOffByProduct, getSaleOffCurrent };
