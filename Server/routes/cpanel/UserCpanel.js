var express = require("express");
var router = express.Router();
const userController = require("../../Component/User/Controller/UserController")

router.get("/profile", function (req, res, next) {
  // Hien thi trang profile
  // http://localhost:3000/api/user/profile
  res.render("product/profile");
});

// http://localhost:3000/cpanel/user/getSeller
router.get('/getSeller', async (req, res, next) => {
   const user = await userController.getByRollID();
  res.render('manager/CensorshipSeller', { user });
});

// http://localhost:3000/cpanel/user/getSeller1
router.get('/getSeller1', async (req, res, next) => {
  const user = await userController.getByRollID();
 res.render('manager/RevenueStatistics', { user });
});
module.exports = router;
