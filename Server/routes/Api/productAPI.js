var express = require('express');
var router = express.Router();
const productController = require('../../Component/Product/productController');
const { validationAddProduct } = require('../../middleware/validation')

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

//http://localhost:3000/Api/productAPI/check-product-by-id/id
// dong y duyet san pham isApproved = 2
router.post('/check-product-by-id/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        await productController.checkProductByid(id, 2);
        return res.status(200).json({message: "Chấp nhận duyệt sản phẩm" });
    } catch (error) {
        return res.status(500).json({ message: "Chấp nhận duyệt sản phẩm Error" });
    }
});

//http://localhost:3000/Api/productAPI/rejectProduct-by-id/id
// tu choi duyet san pham isApproved = 3
router.post('/rejectProduct-by-id/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        await productController.checkProductByid(id, 3);
        return res.status(200).json({message: "Từ chối duyệt sản phẩm" });
    } catch (error) {
        return res.status(500).json({ message: "Từ chối duyệt sản phẩm Error" });
    }
});

//http://localhost:3000/Api/productAPI/get-product-censorship
router.get('/get-product-censorship', async (req, res, next) => {
    try {
        const products = await productController.getProductNotCensorship();
        return res.status(200).json({ result: true, product: products });
    } catch (error) {
        console.log('Search by name error: ', error);
        return res.status(500).json({ result: false, product: null });
    }
});
module.exports = router;