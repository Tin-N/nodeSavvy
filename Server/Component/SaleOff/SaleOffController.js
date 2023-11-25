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
const getSaleOffCurrent = async (saleOffID) => {
    try {
        return await saleOffService.getSaleOffCurrent(saleOffID)
    } catch (err) {
        throw err;
    }
}
const getSaleApplyByIDSale = async (saleID) => {
    try {
        return await saleOffService.getSaleApplyByIDSale(
            saleID
        )
    } catch (err) {
        throw err;
    }
}
const getSaleOffByProduct = async (userID, page, size) => {
    try {
        return await saleOffService.getSaleOffByProduct(
            userID, page, size
        )
    } catch (err) {
        throw err;
    }
}
const updatesaleOffByProduct = async (
    saleOffID, titleSale, saleOff, startDay, endDay) => {
    try {
        return await saleOffService.updatesaleOffByProduct(
            saleOffID, titleSale, saleOff, startDay, endDay
        )
    } catch (error) {
        console.log('update saleOff error(contr): ' + error);
        return false;
    }
}
module.exports = { addSaleOff, getSaleOffCurrent, getSaleOffByProduct, updatesaleOffByProduct, getSaleApplyByIDSale }