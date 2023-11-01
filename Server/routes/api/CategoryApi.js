var express = require('express');
var router = express.Router();
const categoryController = require('../../Component/Category/CategoryController');
const { modelNames } = require('mongoose');
/* GET home page. */
router.get('/damn', function (req, res, next) {
    res.render('index', { title: 'Express123' });
});

//http://localhost:3000/api/Category/getCategory
router.get('/getCategory', async (req, res, next) => {
    try {
        const categories = await categoryController.getAPICategory();
        return res.status(200).json({ result: true, categories: categories });
    } catch (error) {
        return res.status(500).json({ result: false, category: null });
    }
});

//http://localhost:3000/api/Category/1/delete
router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await categoryController.deleteCategoryById(id);
        return res.status(200).json({ result: true });
    } catch (error) {
        return res.status(500).json({ result: false });
    }
});

//them
//http://localhost:3000/api/Category/addCategory
router.post('/addCategory', async (req, res, next) => {
    try {
        let { body } = req;
        const { name } = body;
        await categoryController.addCategory(name);
        return res.status(200).json("add thanh cong");
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("add that bai");
    }
});

//http://localhost:3000/api/Category/1/update-by-id
router.post('/:id/update-by-id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        await categoryController.updateCategoryByid(id, name);
        return res.status(200).json({ result: true, message: "Update Successful" });
    } catch (error) {
        console.log('Update product error: ', error);
        return res.status(500).json({ message: "Update Error" });
    }
});
module.exports = router;
