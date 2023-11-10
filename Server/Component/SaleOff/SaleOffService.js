const saleOffModel = require('./SaleOffModel');
const addSaleOff = async (
    userID, titleSale, productID,
    saleOff, startDay, endDay) => {
    try {
        const newSaleOff = {
            userID, titleSale, productID,
            saleOff, startDay, endDay
        };
        const newS = new saleOffModel(newSaleOff);
        return await newS.save();
    } catch (err) {
        console.log("Không thể cập nhật giá Sale(Ser): " + err);
        return false;
    }
}
module.exports = {addSaleOff}