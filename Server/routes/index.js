var express = require("express");
var router = express.Router();
// js login
var userController = require("../Component/User/Controller/UserController");
/* GET home page. */
// http://localhost:3000/
router.get("/", function (req, res, next) {
  //  Hien thi trang chu

  return res.render("index");
});
// http://localhost:3000/login

router.get("/login", function (req, res, next) {
  // Hien thi trang login
  res.render("user/login");
});
// http://localhost:3000/register

router.get("/register", function (req, res, next) {
  // Hien thi trang login
  res.render("user/register");
});
// http://localhost:3000/profile



router.post("/login", async (req, res, next) => {
  // xu ly login
  // neu thanh cong chuyen sang trang chu
  // neu khong thanh cong chuyen sang trang login

  const { email, password } = req.body;
  const result = await userController.login(email, password);
  if (result) {
    // Create token
    // redirect to home
    res.redirect("/");
    // save token in session
  } else {
    res.redirect("/login");

  }
});
module.exports = router;
