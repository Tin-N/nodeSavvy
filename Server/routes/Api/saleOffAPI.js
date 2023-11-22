var express = require('express');
var router = express.Router();
const saleOffController = require('../../Component/SaleOff/SaleOffController');
const { validationAddSale } = require('../../middleware/validation')
// http://localhost:3000/Api/saleOffAPI/addSaleOff
router.post('/addSaleOff', [validationAddSale], async (req, res, next) => {
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
// http://localhost:3000/Api/saleOffAPI/getSaleOffCurrent
router.get('/getSaleOffCurrent', async (req, res, next) => {
    try {
        let { productID } = req.query;
        const request = await saleOffController.getSaleOffCurrent(productID);
        return res.status(200).json({ result: true, saleOff: request });
    } catch (err) {
        console.log('Không thể lấy sale hiện tại(Api): ' + err);
        return res.status(500).json({ result: false })
    }
})
// http://localhost:3000/Api/saleOffAPI/getSaleOffByProduct
router.get('/getSaleOffByProduct', async (req, res, next) => {
    try {
        const { productID, page, size } = req.query;
        const request = await saleOffController.getSaleOffByProduct(productID, page, size);
        return res.status(200).json({ result: true, saleOff: request });
    } catch (err) {
        console.log('Không thể list sale(Api): ' + err);
        return res.status(500).json({ result: false })
    }
});
router.post('/updatesaleOffByProduct', async (req, res, next) => {
    try {
        const { saleOffID, titleSale, saleOff, startDay, endDay } = req.body;
        const result = await saleOffController.updatesaleOffByProduct(
            saleOffID, titleSale, saleOff, startDay, endDay
        )
        return res.status(200).json({ result: true, kq: result })
    } catch (error) {
        return res.status(500).json({
            message: 'update saleOff error (Api catch):' + error,
            result: false,
        })
    }
})
module.exports = router;