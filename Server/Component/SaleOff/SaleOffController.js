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
const getSaleOffCurrent = async (productID) => {
    try {
        return await saleOffService.getSaleOffCurrent(productID)
    } catch (err) {
        throw err;
    }
}
const getSaleOffByProduct = async (productID, page, size) => {
    try {
        return await saleOffService.getSaleOffByProduct(
            productID, page, size
        )
    } catch (err) {
        throw err;
    }
}
module.exports = {addSaleOff,getSaleOffCurrent,getSaleOffByProduct}