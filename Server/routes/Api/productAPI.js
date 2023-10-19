var express = require('express');
var router = express.Router();
const productController = require('../../Component/Product/productController');
const { validationAddProduct } = require('../../middleware/validation');
const productModel = require('../../Component/Product/productModel');

// http://localhost:3000/Api/productAPI/addProduct
router.post('/addProduct', [validationAddProduct], async (req, res, next) => {
    try {
        let { body } = req;
        const { userID, categoryID, price,
            detail, image, isApproved,
            name, quantity, sold, rating, options } = body;
        await productController.addProduct(
            userID, categoryID, price,
            detail, image, isApproved,
            name, quantity, sold, rating, options);
        return res.status(200).json({ result: true })
    } catch (err) {
        console.log('Không thêm được  sản phẩm: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/productAPI/updateProduct
router.post('/updateProduct', async (req, res, next) => {
    try {
        let { id,detail,name,quantity } = req.query;
        console.log(id,detail,name,quantity, "API");
        const result= await productController.updateProduct(id,detail,quantity,name);
        
        if(result)
            return res.status(200).json({ result: true,message:"Sửa thành công" });
        else
            return res.status(400).json({ result: false,message:"Lỗi không thể sửa" });
    } catch (err) {
        console.log('Không thêm được  sản phẩm: ' + err);
        return res.status(500).json({ result: false })
    }
});
// http://localhost:3000/Api/productAPI/deleteProduct

router.post('/deleteProduct', async (req, res, next) => {
    try {
        let { id } = req.query;
        const result= await productController.deleteProduct(id)
        if(result)
            return res.status(200).json({ result: true,message:"Xóa thành công" });
        else
            return res.status(400).json({ result: true,message:"Lỗi không thể xóa" });

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
// http://localhost:3000/Api/productAPI/getAllProductByUserID?id=
router.get('/getAllProductByUserID', async (req, res, next) => {
    try {
        const {id} = req.query;
        const products = await productController.getAllProductByUserID(id);
        console.log(products);
        return res.status(200).json({
            result:true, products: products
        })
    } catch (error) {
        console.log('getAllProductByUserID error(Api): '+error);
    }
});
// http://localhost:3000/Api/productAPI/getProductByID?id=

router.get('/getProductByID', async (req, res, next) => {
    try {
        const {id} = req.query;
        const products = await productController.getProductByID(id);
        console.log(id);
        return res.status(200).json({
            result:true, products: products
        })
    } catch (error) {
        console.log('getProductByID error(Api): '+error);
    }
});

// http://localhost:3000/Api/productAPI/getProductByCategoryID?id=



// http://localhost:3000/Api/productAPI/getAllProductByUserIDByPage?id=

// Paging
router.get('/getAllProductByUserIDByPage', async (req, res, next) => {
    try {
        const {id,limitData,skipPage} = req.query;
        const products = await productController.getAllProductByUserIDByPage(id,limitData,skipPage);
        console.log(products);
        return res.status(200).json({
            result:true, products: products
        })
    } catch (error) {
        console.log('getAllProductByUserID error(Api): '+error);
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

router.get('/getProductByCategoryID', async (req, res, next) => {``
    try {
        const {id,limitData,skipPage} = req.query;

        console.error(id,limitData,skipPage);

        const products = await productController.getProductByCategoryID(id,limitData,skipPage);
        return res.status(200).json({
            result:true, products: products
        })
    } catch (error) {
        console.log('getProductByCategoryID error(Api): '+error);
    }
});

// http://localhost:3000/Api/productAPI/searchByName?name=

router.get('/searchByName', async (req, res, next) => {``
    try {
        const {name,limitData} = req.query;


        const products = await productController.searchByName(name,limitData);
        return res.status(200).json({
            result:true, products: products
        })
    } catch (error) {
        console.log('searchByName error(Api): '+error);
    }
});
module.exports = router;