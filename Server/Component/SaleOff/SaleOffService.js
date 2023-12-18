const { model } = require("mongoose");
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

const getSaleOffCurrent = async (saleOffID) => {
  try {
    const now = new Date();
    const threeDaysLater = new Date(now).setDate(now.getDate() + 3);
    const sales = await saleOffModel.aggregate([
      {
        $match: {
          _id: saleOffID,
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
          endDay: "$endDay",
          productID: "$productID",
          saleOff: "$saleOff",
        },
      },
      {
        $match: {
          startDay: { $ne: null }
        }
      },
      {
        $sort: {
          startDay: 1
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

const getSaleApplyByIDSale = async (saleID) => {
  try {
    if (typeof saleID != "undefined") {
      const sales = await saleOffModel.findById(saleID)
      return sales;
    }
    return false;
  } catch (err) {
    console.log("Không thể lấy ticket sale đang dùng(Ser): " + err);
    return false;
  }
}

const getSaleOffByProduct = async (userID, page, size) => {
  try {
    // const sales = await saleOffModel
    //   .find({ productID: productID })
    //   .limit(size)
    //   .page(page);
    const sales = await saleOffModel.find({ userID: userID })
      .limit(size).skip(page)
    return sales;
  } catch (err) {
    console.log("Không thể cập nhật giá Sale(Ser): " + err);
    return false;
  }
};



const updatesaleOffByProduct = async (saleOffID, titleSale, saleOff, startDay, endDay) => {
  try {
    const sale = await saleOffModel.findById(saleOffID);
    if (sale) {
      sale.saleOff = saleOff ? saleOff : saleOff.saleOff;
      sale.titleSale = titleSale ? titleSale : saleOff.titleSale;
      sale.startDay = startDay ? startDay : saleOff.startDay;
      sale.endDay = endDay ? endDay : saleOff.endDay;
      await sale.save();
      return true;
    }
    return false

  } catch (error) {
    console.log("update saleOff error(ser): " + error);
  }
}
module.exports = { addSaleOff, getSaleOffByProduct, getSaleOffCurrent, updatesaleOffByProduct, getSaleApplyByIDSale };
