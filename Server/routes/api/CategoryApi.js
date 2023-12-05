var express = require('express');
var router = express.Router();
const categoryController = require('../../Component/Category/CategoryController');
/* GET home page. */
router.get('/damn', function (req, res, next) {
    res.render('index', { title: 'Express123' });
});

//http://localhost:3000/Api/Category/getCategory
router.get('/getCategory', async (req, res, next) => {
    try {
        const categories = await categoryController.getAPICategory();
        return res.status(200).json({ result: true, categories: categories });
    } catch (error) {
        return res.status(500).json({ result: false, category: null });
    }
});


router.get('/getCategoryNotDelete', async (req, res, next) => {
    try {
        const categories = await categoryController.getAPICategoryNotDelete();
        return res.status(200).json({ result: true, categories: categories });
    } catch (error) {
        return res.status(500).json({ result: false, category: null });
    }
});

router.get('/getCategoryDelete', async (req, res, next) => {
    try {
        const categories = await categoryController.getAPICategoryDelete();
        return res.status(200).json({ result: true, categories: categories });
    } catch (error) {
        return res.status(500).json({ result: false, category: null });
    }
});

//http://localhost:3000/api/Category/1/delete
router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await categoryController.deleteCategoryById(id, true);
        return res.status(200).json({ result: true, message: "Delete Successful" });
    } catch (error) {
        console.log('Delete product error: ', error);
        return res.status(500).json({ message: "Delete Error" });
    }
});

//them
//http://localhost:3000/api/Category/addCategory
router.post('/addCategory', async (req, res, next) => {
    try {
        let { body } = req;
        const { name, images, color } = body;
        await categoryController.addCategory(name, images, color, false);
        return res.status(200).json("add thanh cong");
    } catch (error) {
        console.log('New product error: ', error);
        return res.status(500).json("add that bai");
    }
});

//http://localhost:3000/Api/Category/1/update-by-id
router.post('/:id/update-by-id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, images, color } = req.body;
        await categoryController.updateCategoryByid(id, name, images, color);
        return res.status(200).json({ result: true, message: "Update Successful" });
    } catch (error) {
        console.log('Update product error: ', error);
        return res.status(500).json({ message: "Update Error" });
    }
});

// router.get('/searchCategoryName', async (req, res, next) => {``
//     try {
//         const {name} = req.query;


//         const categories = await categoryController.searchCategoryName(name);
//         return res.status(200).json({
//             result:true, categories: categories
//         })
//     } catch (error) {
//         console.log('searchByName error(Api): '+error);
//     }
// });
module.exports = router;
