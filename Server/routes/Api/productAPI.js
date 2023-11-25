var express = require('express');
var router = express.Router();
const productController = require('../../Component/Product/productController');

const { validationAddProduct } = require('../../middleware/validation');
const productModel = require('../../Component/Product/productModel');


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
// http://localhost:3000/Api/productAPI/updateProduct

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
// http://localhost:3000/Api/productAPI/getAllProductByUserID?id=113
router.get('/getAllProductByUserID', async (req, res, next) => {
    try {
        const { id } = req.query;
        const products = await productController.getAllProductByUserID(id);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('getAllProductByUserID error(Api): ' + error);
    }
});
router.get('/getAllProductByUserIDAndQuantity', async (req, res, next) => {
    try {
        const { id } = req.query;
        const products = await productController.getAllProductByUserIDAndQuantity(id);
        console.log(products);
        return res.status(200).json({
            result: true, products: products
        })
    } catch (error) {
        console.log('getAllProductByUserIDAndQuantity error(Api): ' + error);
    }
});
router.get('/getListProductSelling', async (req, res, next) => {
    try {
        const { id, isShow, size } = req.query;
        const products = await productController.getListProductSelling(id, isShow, size);
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
function calculatePage(countData) {
    const trangMoiTrang = 20;
    const soTrang = countData <= trangMoiTrang ? 1 : Math.ceil(countData / trangMoiTrang);
    return soTrang;
  } 
router.get('/searchByName', async (req, res, next) => {``
    try {
        const {
            name,
            limitData,
            categoryID,
            userID,
            skipData,
            sortName,
            sortPrice,
            sortRating,
            lte,
            gte} = req.query;

            console.log(typeof name);
        const products = await productController.searchByName(
            name,
            limitData,
            categoryID,
            userID,
            skipData,
            sortName,
            sortPrice,
            sortRating,
            lte,
            gte);
            const totalPage=calculatePage(products.count);
            console.log(totalPage,products.count,"TOTAL PAGES");
        return res.status(200).json({
            result:true, products: products.result,totalPage:totalPage,
            count:products.count
        })
    } catch (error) {
        console.log('searchByName error(Api): '+error);
    }
});



// Filter 
// http://localhost:3000/Api/productAPI/filterProductByName

router.get('/filterProductByName', async (req, res, next) => {``
    try {
        const {
            name,
            sortNew,
            sortPrice,
            sortRating,
            sortDiscount,
            skipData,
            limitData,
        } = req.query;


        const products = await productController.FilterProductByName(
            name,
            skipData,
            limitData,
            sortNew,
            sortPrice,
            sortRating,
            sortDiscount
            );

            console.log(skipData,"dddddddddddd");
        return res.status(200).json({
            result:true, products: products.product,count:products.count,totalPage:calculatePage(products.count)
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
        console.log(result,sold,productID );
        return res.status(200).json({ result: true, product: result })
    } catch (err) {
        console.log('Update sold error(Api): ' + err);
        return res.status(500).json({ result: false })
    }
});
router.post('/updateQuantity' ,async (req, res, next) => {
    try {
        const { productID,quantity } = req.body;
        const result = await productController.updateQuantityProduct(productID, quantity);
        console.log(result,productID );
        return res.status(200).json({ result: true, product: result })
    } catch (err) {
        console.log('Update sold error(Api): ' + err);
        return res.status(500).json({ result: false })
    }
});
router.post('/updateProduct', async (req, res, next) => {
    try {
        let { body } = req
        const { productID, name, price, detail, categoryID, saleOffID } = body;
        const result = await productController.updateProduct(
            productID, name, price, detail, categoryID, saleOffID
        )
        return res.status(200).json({ result: true })
    } catch (error) {
        return res.status(500).json({
            result: false,
            message: 'update product error(Api)'
        })
    }
})

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