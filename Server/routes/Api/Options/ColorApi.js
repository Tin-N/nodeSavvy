var express = require('express');
var router = express.Router();
var colorController = require('../../../Component/Options/Color/colorController')
// http://localhost:3000/Api/Options/colorAPI/addColor
router.post('/addColor', async (req, res, next) => {
    try {
        let { productID,color,title,image} = req.query;
        const result=  await colorController.addColor(productID,color,title,image);
        return res.status(200).json({ result: true,color:result })
    } catch (err) {
        console.log('Không thêm được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});

// http://localhost:3000/Api/Options/ColorApi/deleteColor

router.post('/deleteColor', async (req, res, next) => {
    try {
        let { id} = req.query;
        const result=  await colorController.deleteColor(id);
        return res.status(200).json({ result: true,color:result })
    } catch (err) {
        console.log('Không xoa được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/Options/ColorApi/getColorByProductId

router.post('/getColorByProductId', async (req, res, next) => {
    try {
        let { productID} = req.query;
        const result=  await colorController.getColorByProductId(productID);
        return res.status(200).json({ result: true,result:result })
    } catch (err) {
        console.log('Không lay được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});
module.exports=router;