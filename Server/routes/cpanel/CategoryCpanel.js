var express = require("express");
var router = express.Router();
// const productController = require("../../Component/Product/ProductController");
const categoryController = require("../../Component/Category/CategoryController");
// const uploadFile = require("../../Middleware/UploadFile");

//localhost:3000/cpanel/category
router.get("/", async (req, res, next) => {
  const category = await categoryController.getAPICategory(1, 10);
  res.render("product/list", { category });
});

router.post("/:id/delete", async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await categoryController.deleteCategoryById(id);
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

// router.get("/form", async (req, res, next) => {
//   try {
//     const categories = await categoryController.getCategories();
//     // Hien thi trang form
//     return res.render("product/form", { categories });
//   } catch (error) {
//     next(error);
//   }
// });
// http://localhost:3000/cpanel/product/:id/edit

// router.get("/:id/edit", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const product = await productController.getProductById(id);
//     let categories = await categoryController.getCategories();
//     categories = categories.map(item => {
//       item.selected = false;
//       console.log(product.category.toString() + "   " + item._id.toString());

//       if (item._id.toString() == product.category.toString()) {
//         item.selected = true;

//       }
//       return item;
//     });
//     return res.render('product/edit', { product, categories });
//   } catch (error) {

//   }

// });
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

// http://localhost:3000/cpanel/category/getCategory
router.get('/getCategory', async (req, res, next)=>{
  const categories = await categoryController.getAPICategoryNotDelete();
  res.render('manager/CensorshipCategory', {categories});
});

// http://localhost:3000/cpanel/category/addCategory
router.get('/addCategory', async (req, res, next)=>{
  // const categories = await categoryController.getAPICategoryNotDelete();
  res.render('manager/AddCategory');
});

// http://localhost:3000/cpanel/category/editCategory
router.get('/editCategory', async (req, res, next)=>{
  // const categories = await categoryController.getAPICategoryNotDelete();
  res.render('manager/EditCategory');
});
module.exports = router;
