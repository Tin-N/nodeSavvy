var express = require('express');
var router = express.Router();
var FavoriteController = require('../../Component/Favorite/FavoriteController')
// http://localhost:3000/Api//favoriteApi/addFavorite
router.post('/addFavorite', async (req, res, next) => {
    try {
        let {userID,productID} = req.query;
        const result=  await FavoriteController.addFavorite(userID,productID);
        return res.status(200).json({ 
            result: true
            ,favorite:result
         })
    } catch (err) {
        console.log('Không thêm được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});

// http://localhost:3000/Api/favoriteApi/deleteFavorite

router.post('/deleteFavorite', async (req, res, next) => {
    try {
        let { id} = req.query;
        const result=  await FavoriteController.deleteFavorite(id);
        return res.status(200).json({ result: true,favorite:result })
    } catch (err) {
        console.log('Không xoa được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/favoriteApi/getFavorite

router.get('/getFavorite', async (req, res, next) => {
    try {
        let { userID,productID} = req.query;
        const result=  await FavoriteController.getFavoriteByFeedbackId(userID,productID);
       if(result)
       return res.status(200).json({ 
        result: true
        ,favorite:result
     })
     return res.status(200).json({ 
        result: false
        ,favorite:result
     })
    } catch (err) {
        console.log('Không lay được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/favoriteApi/getFavoriteByUserID
function calculatePage(countData,limit) {
    const trangMoiTrang = limit;
    const soTrang =
      countData <= trangMoiTrang ? 1 : Math.ceil(countData / trangMoiTrang);
    return soTrang;
  }
router.get('/getFavoriteByUserID', async (req, res, next) => {
    try {
        const  { userID,limit,size} = req.query;
        const result=  await FavoriteController.getFavoriteByUserID(userID,limit,size);
       console.log(result.result);
        if(result.count>0)
       return res.status(200).json({ 
        result: true
        ,favorite:result.result
        ,countData:result.count
        ,totalPages:calculatePage(result.count,10)
     })
     return res.status(400).json({ 
        result: false
        ,favorite:null
       
     })
    } catch (err) {
        console.log('Không lay được màu api: ' + err);
        return res.status(500).json({ result: false })
    }
});
module.exports=router;