const saleOffService = require('./SaleOffService');
const addSaleOff = async (
    userID, titleSale, productID,
    saleOff, startDay, endDay) => {
    try {
        return await saleOffService.addSaleOff(
            userID, titleSale, productID,
            saleOff, startDay, endDay
        )
    } catch (err) {
        throw err;
    }
}
module.exports = {addSaleOff}