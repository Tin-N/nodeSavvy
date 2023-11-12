var express = require('express');
var router = express.Router();
const productController = require('../../Component/Product/productController');
const { validationAddProduct } = require('../../middleware/validation')
const { validationUpdateQuantity } = require('../../middleware/validation')
// http://localhost:3000/Api/productAPI/addProduct
router.post('/addProduct', [validationAddProduct], async (req, res, next) => {
    try {
        let { body } = req;
        const { userID, categoryID, price,
            detail, image, isApproved,
            name, quantity, sold, rating, options } = body;
        const request = await productController.addProduct(
            userID, categoryID, price,
            detail, image, isApproved,
            name, quantity, sold, rating, options);
        return res.status(200).json({ result: true, productID: request._id })
    } catch (err) {
        console.log('Không thêm được  sản phẩm: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/productAPI/addOption
router.post('/addOption', async (req, res, next) => {
    try {
        let { body } = req;
        const {
            productID, title, color, titleColor,
            size, weight, imageOption } = body;
        const result = await productController.addOption(
            productID, title, color, titleColor,
            size, weight, imageOption
        )
        return res.status(200).json({ result: result })
    } catch (error) {
        console.log('Không thể thêm thuộc tính cho sản phẩm!' + error);
        return res.status(500).json({ result: false })
    }
})
// http://localhost:3000/Api/productAPI/getAllProductByUserID?id=113
router.get('/getAllProductByUserID', async (req, res, next) => {
    try {
        const { id } = req.query;
        const products = await productController.getAllProductByUserID(id);
        console.log(products);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('getAllProductByUserID error(Api): ' + error);
    }
});
router.get('/getListProductSelling', async (req, res, next) => {
    try {
        const { id, isShow, page, size } = req.query;
        const products = await productController.getListProductSelling(id, isShow, page, size);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('getAllProductByUserID error(Api): ' + error);
    }
});
// http://localhost:3000/Api/productAPI/getProductByID?id=
router.get('/getProductByID', async (req, res, next) => {
    try {
        const { id } = req.query;
        const products = await productController.getProductByID(id);
        console.log(id);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('getProductByID error(Api): ' + error);
    }
});

// http://localhost:3000/Api/productAPI/getProductByCategoryID?id=


// http://localhost:3000/Api/productAPI/getAllProductByUserIDByPage?id=     &limitData=  &skipPage=0

// Paging
router.get('/getAllProductByUserIDByPage', async (req, res, next) => {
    try {
        const { id, limitData, skipPage } = req.query;
        const products = await productController.getAllProductByUserIDByPage(id, limitData, skipPage);
        console.log(products);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('getAllProductByUserID error(Api): ' + error);
    }
});
// http://localhost:3000/Api/productAPI/getProductByCategoryID?id=

// router.get('/getProductByCategoryID', async (req, res, next) => {
//     try {
//         const {id} = req.query;
//         const products = await productController.getProductByCategoryID(id);
//         return res.status(200).json({
//             result:true, products: products
//         })
//     } catch (error) {
//         console.log('getProductByCategoryID error(Api): '+error);
//     }
// });

// Viewmore

// http://localhost:3000/Api/productAPI/getProductByCategoryID?id=
// http://localhost:3000/Api/productAPI/getProductByCategoryID?id=     &limitData=  &skipPage=0

router.get('/getProductByCategoryID', async (req, res, next) => {
    ``
    try {
        const { id, limitData, skipPage } = req.query;

        console.error(id, limitData, skipPage);

        const products = await productController.getProductByCategoryID(id, limitData, skipPage);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('getProductByCategoryID error(Api): ' + error);
    }
});

// http://localhost:3000/Api/productAPI/searchByName?name=

router.get('/searchByName', async (req, res, next) => {
    ``
    try {
        const { name, limitData } = req.query;


        const products = await productController.searchByName(name, limitData);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('searchByName error(Api): ' + error);
    }
});
// http://localhost:3000/Api/productAPI/deleteProduct
router.post('/deleteProduct', async (req, res, next) => {
    try {
        const { productID, isShow } = req.body;
        const result = await productController.deleteProduct(productID, isShow);
        return res.status(200).json({ result: true, product: result })
    } catch (err) {
        console.log('Delete product error(Api): ' + err);
        return res.status(500).json({ result: false })
    }
});
router.post('/updateQuantityProductForCustomer', [validationUpdateQuantity],async (req, res, next) => {
    try {
        const { productID, quantity } = req.body;
        const result = await productController.updateQuantityProductForCustomer(productID, quantity);
        return res.status(200).json({ result: true, product: result })
    } catch (err) {
        console.log('Update quantity error(Api): ' + err);
        return res.status(500).json({ result: false })
    }
});
router.post('/updateSoldProduct' ,async (req, res, next) => {
    try {
        const { productID, sold } = req.body;
        const result = await productController.updateSoldProduct(productID, sold);
        return res.status(200).json({ result: true, product: result })
    } catch (err) {
        console.log('Update sold error(Api): ' + err);
        return res.status(500).json({ result: false })
    }
});
router.post('/updateProduct', async (req, res, next) => {
    try {
        let { body } = req
        const { productID, name, price, detail, categoryID } = body;
        const result = await productController.updateProduct(
            productID, name, price, detail, categoryID
        )
        return res.status(200).json({ result: true })
    } catch (error) {
        return res.status(500).json({
            result: false,
            message: 'update product error(Api)'
        })
    }
})
module.exports = router;