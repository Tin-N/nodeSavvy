var express = require('express');
var router = express.Router();
var FavoriteController = require('../../Component/Favorite/FavoriteController')
// http://localhost:3000/Api/FavoriteApi/addFavorite
router.post('/addFavorite', async (req, res, next) => {
    try {
        let {userID,productID} = req.query;
        const result=  await FavoriteController.addFavorite(userID,productID);
        return res.status(200).json({ result: true,result:result })
    } catch (err) {
        console.log('Không thêm được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});

// http://localhost:3000/Api/FavoriteApi/deleteFavorite

router.post('/deleteFavorite', async (req, res, next) => {
    try {
        let { id} = req.query;
        const result=  await FavoriteController.deleteFavorite(id);
        return res.status(200).json({ result: true,result:result })
    } catch (err) {
        console.log('Không xoa được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/FavoriteApi/getFavorite

router.get('/getFavorite', async (req, res, next) => {
    try {
        let { userID,productID} = req.query;
        const result=  await FavoriteController.getFavoriteByFeedbackId(userID,productID);
        return res.status(200).json({ result: true,result:result })
    } catch (err) {
        console.log('Không lay được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});
module.exports=router;