var express = require("express");
var router = express.Router();
// const productController = require("../../Component/Product/ProductController");
const categoryController = require("../../Component/Category/CategoryController");
const UpLoadFile = require("../../middleware/UpLoadFile");

// //localhost:3000/cpanel/category
// router.get("/", async (req, res, next) => {
//   const category = await categoryController.getAPICategory(1, 10);
//   res.render("product/list", { category });
// });

// router.post("/:id/delete", async function (req, res, next) {
//   try {s
//     const { id } = req.params;
//     console.log(id);
//     const result = await categoryController.deleteCategoryById(id);
//     res.json({ result });
//   } catch (error) {
//     res.json({ result: false });
//   }
// });


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

// http://localhost:3000/cpanel/category/getCategory
router.get('/getCategory', async (req, res, next)=>{
  const categories = await categoryController.getAPICategoryNotDelete();
  res.render('manager/CensorshipCategory', {categories});
});

//http://localhost:3000/cpanel/Category/1/delete
router.post('/:id/delete', async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryController.deleteCategoryById(id, true);
    return res.json({ result});
  } catch (error) {
    return res.json({ result: false});
  }
});

// http://localhost:3000/cpanel/category/addCategory
router.get('/addCategory', async (req, res, next)=>{
  res.render('manager/AddCategory');
});

// http://localhost:3000/cpanel/category/addCategory1
router.post('/addCategory1', [UpLoadFile.single('image')], async (req, res, next)=>{
  //lay cac loai danh muc da co
  const categories = await categoryController.getAPICategory();
  const nameGet = [];
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i].name;
    nameGet.push(category);
  }

  try {
    let { body, file } = req;
    if (file) {
      file = `http://192.168.1.237:3000/images/${file.filename}`;
      body = { ...body, images: file};
    }
    const { name, color, images } = body;
    if(name !=="", color !=="", nameGet.includes(name) == false){
      const result = await categoryController.addCategory(name, color, images, false);
      if (result) {
        return res.redirect('/cpanel/category/getCategory');
      } else {
        return res.redirect('/cpanel/category/addCategory');
      }
    }else{
       return res.redirect('/cpanel/category/addCategory');
    }
  } catch (error) {
    next(error)
  }
});


// http://localhost:3000/cpanel/category/editCategory/6560421915353f38442b456
router.get('/editCategory/:id', async (req, res, next)=>{
  const { id } = req.params;
  const categories = await categoryController.getAPICategoryById(id);
  res.render('manager/EditCategory', {categories});
});

// http://localhost:3000/cpanel/category/6560421915353f38442b456/editCategory
router.post("/:id/editCategory", [UpLoadFile.single('image')], async (req, res, next) => {
  // Xu ly trang form
  try {
    let { body, file } = req;
    let { id } = req.params;
    if (file) {
      file = `http://192.168.1.237:3000/images/${file.filename}`;
      body = { ...body, images: file };
    }
    const { name, color, images } = body;
    const result = await categoryController.updateCategoryByid(id, name, images, color);
    console.log('>>>>>>>>>result: ', result);
    if (result) {
      return res.redirect('/cpanel/category/getCategory');
    } else {
      return res.redirect('/cpanel/category/editCategory/' + id);
    }
  } catch (error) {
    next(error)
  }
});
module.exports = router;
