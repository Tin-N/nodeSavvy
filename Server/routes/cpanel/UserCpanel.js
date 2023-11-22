var express = require("express");
var router = express.Router();
router.get("/profile", function (req, res, next) {
    // Hien thi trang profile
    // http://localhost:3000/api/user/profile
    res.render("product/profile");
  });
module.exports = router;
