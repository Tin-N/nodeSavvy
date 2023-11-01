var express = require('express');
var router = express.Router();
var sizeController = require('../../../Component/Options/Size/sizeController')

// http://localhost:3000/Api/Options/sizeAPI/addSize
router.post('/addSize', async (req, res, next) => {
    try {
        let { sizeArray } = req.body;
        const result = await sizeController.addSize(sizeArray);
        return res.status(200).json({ result: true, result: result })
    } catch (err) {
        console.log('Không thêm được size api: ' + err);
        return res.status(500).json({ result: false })
    }
});

// http://localhost:3000/Api/Options/sizeAPI/deleteSize

router.post('/deleteSize', async (req, res, next) => {
    try {
        let { id } = req.query;
        const result = await sizeController.deleteSize(id);
        return res.status(200).json({ result: true, result: result })
    } catch (err) {
        console.log('Không xoa được size api: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/Options/sizeAPI/getSizeByProductId

router.get('/getSizeByProductId', async (req, res, next) => {
    try {
        let { productID } = req.query;
        const result = await sizeController.getSizeByProductId(productID);
        return res.status(200).json({ result: true, size: result })
    } catch (err) {
        console.log('Không lay được size api: ' + err);
        return res.status(500).json({ result: false })
    }
});
module.exports = router