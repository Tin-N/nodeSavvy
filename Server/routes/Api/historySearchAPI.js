var express = require('express');
var router = express.Router();
const historySearchController = require('../../Component/HistorySearch/historySearchController');
const { validationAddProduct } = require('../../middleware/validation')
const searchCountController = require('../../Component/HistorySearch/historySearchController');
// http://localhost:3000/Api/historySearchAPI/addNewHistory?

router.post('/addNewHistory', async (req, res, next) => {
    try {
        const {idUser,keyword} = req.query;
        const newHistory = await historySearchController.addNewHistorySearch(idUser,keyword);
        // console.log(products);
        return res.status(200).json({
            result:true, data: newHistory
        })
    } catch (error) {
        console.log('addNewHistory error(Api): '+error);
    }
});
// http://localhost:3000/Api/historySearchAPI/getHistorySearch?idUser
router.get('/getHistorySearch', async (req, res, next) => {
    try {
        const {idUser,limitData} = req.query;
        const newHistory = await historySearchController.getHistorySearch(idUser,limitData);
        // console.log(newHistory);
        return res.status(200).json({
            result:true, data: newHistory
        })
    } catch (error) {
        console.log('getHistorySearch error(Api): '+error);
    }
});
// http://localhost:3000/Api/historySearchAPI/deleteHistorySearch?

router.post('/deleteHistorySearch', async (req, res, next) => {
    try {
        const {id} = req.query;
        const newHistory = await historySearchController.deleteHistorySearch(id);
        console.log(newHistory);
        return res.status(200).json({
            result:true, data: newHistory
        })
    } catch (error) {
        console.log('deleteHistorySearch error(Api): '+error);
    }
});




// http://localhost:3000/Api/historySearchAPI/addNewHistory?

router.post('/addNewSearchCount', async (req, res, next) => {
    try {
        const {keyword,searchTypes} = req.query;
        const newHistory = await historySearchController.addNewSearchCount(idUser,keyword,searchTypes);
        // console.log(products);
        return res.status(200).json({
            result:true, data: newHistory
        })
    } catch (error) {
        console.log('addNewHistory error(Api): '+error);
    }
});
// http://localhost:3000/Api/historySearchAPI/getHistorySearch?idUser
router.get('/getSearchPopular', async (req, res, next) => {
    try {
        const {searchTypes,limitData} = req.query;
        const newSearchPopular = await historySearchController.getSearchPopular(searchTypes,limitData);
        console.log(newSearchPopular);
        return res.status(200).json({
            result:true, data: newSearchPopular
        })
    } catch (error) {
        console.log('getHistorySearch error(Api): '+error);
    }
});
module.exports = router;