var express = require('express');
var router = express.Router();
const saleOffController = require('../../Component/SaleOff/SaleOffController');
// http://localhost:3000/Api/saleOffAPI/addSaleOff
router.post('/addSaleOff', async (req, res, next) => {
    try {
        let { body } = req;
        const { userID, titleSale, productID, saleOff, startDay, endDay } = body;
        const request = await saleOffController.addSaleOff(
            userID, titleSale, productID, saleOff, startDay, endDay);
        return res.status(200).json({ result: true, saleOff: request });
    } catch (err) {
        console.log('Không thể cập nhật giảm giá(Api): ' + err);
        return res.status(500).json({ result: false })
    }
});
module.exports = router;