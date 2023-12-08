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

function calculatePage(countData) {
  const trangMoiTrang = 20;
  const soTrang =
    countData <= trangMoiTrang ? 1 : Math.ceil(countData / trangMoiTrang);
  return soTrang;
}
// http://localhost:3000/cpanel/user/ManagerSeller
router.get('/ManagerSeller/:page', async (req, res, next) => {
  const {page}=req.params;
  const user = await userController.getUserList(10,page);
  // console.log(user.result,user.count);
 res.render('manager/ManagerSeller', { user:user.result,countData:user.count,currentPage:page });
});
module.exports = router;
