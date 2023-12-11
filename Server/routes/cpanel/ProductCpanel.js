var express = require("express");
var router = express.Router();
const productController = require("../../Component/Product/ProductController");
const categoryController = require("../../Component/Category/CategoryController");
const userController = require("../../Component/User/Controller/UserController");
const notificationController = require("../../Component/Notification/NotificationController")
// const uploadFile = require("../../Middleware/UploadFile");
// localhost:3000/cpanel/product

// router.get("/", async (req, res, next) => {
//   const products = await productController(1, 10);
//   res.render("product/list", { products });
// });

router.post("/:id/delete", async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await productController.deleteProductById(id);
    res.json({ result });
  } catch (error) {
    res.json({ result: false });
  }
});


// http://localhost:3000/chart


router.get("/profile", function (req, res, next) {
  // Hien thi trang profile
  // http://localhost:3000/cpanel/product/profile
  res.render("product/profile");
});

// http://localhost:3000/cpanel/product/chart

router.get("/chart", function (req, res, next) {
  // Hien thi trang login
  res.render("product/chart");
});
// http://localhost:3000/cpanel/product/form

router.get("/form", async (req, res, next) => {
  try {
    const categories = await categoryController.getCategories();
    // Hien thi trang form
    return res.render("product/form", { categories });
  } catch (error) {
    next(error);
  }
});
// http://localhost:3000/cpanel/product/:id/edit

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productController.getProductById(id);
    let categories = await categoryController.getCategories();
    categories = categories.map(item => {
      item.selected = false;
      console.log(product.category.toString() + "   " + item._id.toString());

      if (item._id.toString() == product.category.toString()) {
        item.selected = true;

      }
      return item;
    });
    return res.render('product/edit', { product, categories });
  } catch (error) {

  }

});
// update post
router.post("/:id/edit", [], async (req, res, next) => {
  // Xu ly trang form
  try {
    let { body, file } = req;
    let { id } = req.params;
    if (file) {
      file = `http://172.16.71.2:3000/images/${file.filename}`;
      body = { ...body, image: file };
    }
    const { name, price, quantity, image, category } = body;
    const result = await productController.updateProductById(id, name, price, quantity, image, category);
    console.log(result);
    if (result) {
      return res.redirect('/cpanel/product');
    } else {
      return res.redirect('/cpanel/product/' + id + '/edit');
    }
  } catch (error) {
    next(error)
  }
});
router.post("/form", [], async (req, res, next) => {
  // Xu ly trang form
  try {
    let { body, file } = req;
    if (file) {
      file = `http://172.16.71.2:3000/images/${file.filename}`;
      body = { ...body, image: file };
    }
    const { name, price, quantity, image, category } = body;
    const result = await productController.addNewProduct(name, price, quantity, image, category);
    console.log(result);
    console.log(name, price, quantity, image, category);
    if (result) {
      return res.redirect('/cpanel/product');
    } else {
      return res.redirect('/cpanel/product/form');
    }
  } catch (error) {
    next(error)
  }
});




//http://localhost:3000/cpanel/product/getCensorshipProduct
router.get('/getCensorshipProduct', async (req, res, next) => {
  const product = await productController.getProductNotCensorship();
  res.render('manager/CensorshipProduct', { product });
});
router.get('/dcm', async (req, res, next) => {
  const product = await productController.getProductNotCensorship();
  res.render('manager/CensorshipProduct', { product });
});
//http://localhost:3000/cpanel/product/getDetailCensorshipProduct/id
router.get('/getDetailCensorshipProduct/:id', async (req, res, next) => {
  try {
  const { id } = req.params;
  const product = await productController.getProductByID(id);
  const categories = await categoryController.getAPICategoryById(product.categoryID);
  
  const user = await userController.getById(product.userID);
  res.render('manager/CensorshipDetailProduct', { product, categories, user });
} catch (error) {
  next(error)
}
});

//http://localhost:3000/cpanel/product/check-product-by-id/id
// dong y duyet san pham isApproved = 2
router.post("/check-product-by-id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productController.checkProductByid(id, 2);
    console.log(">>>>>>>>Đồng ý: ", result);
    if (result) {
      return res.status(200).json({result:result})
      } else {
        return res.status(400).json({result:result})
       
    }
  } catch (error) {
    next(error)
  }
});

//http://localhost:3000/cpanel/product/rejectProduct-by-id/id
// tu choi duyet san pham isApproved = 3
router.post("/rejectProduct-by-id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await productController.checkProductByid(id, 3);
    const product = await productController.getProductByID(id);
    
    const notification = await notificationController.rejectNotification(product.userID, product._id, "Từ chối duyệt sản phẩm");
    console.log(">>>>>>>>notification: ", notification);
    return res.redirect('/cpanel/product/getCensorshipProduct');
  } catch (error) {
    next(error)
  }
});


module.exports = router;
