var express = require("express");
var router = express.Router();
const productController = require("../../Component/Product/productController");
const categoryController = require("../../Component/Category/CategoryController");
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

//http://localhost:3000/cpanel/product/getCensorshipProduct1
router.get('/getCensorshipProduct1', async (req, res, next) => {
  const product = await productController.getProductNotCensorship();
 res.render('product/EditCategory', { product });
});

//http://localhost:3000/cpanel/product/Revenue
router.get("/Revenue", function (req, res, next) {
  // Hien thi trang login
  res.render("manager/RevenueStatistics");
});

//http://localhost:3000/cpanel/product/User
router.get("/User", function (req, res, next) {
  // Hien thi trang login
  res.render("manager/UserStatistics");
});
module.exports = router;
