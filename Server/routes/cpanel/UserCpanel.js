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

//chap nhan user lam seller 3
//http://localhost:3000/cpanel/user/check-seller-by-id/:id
router.post('/check-seller-by-id/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      
      await userController.checkUserByid(id, 3);
      return res.status(200).json({message: "Chấp nhận user làm seller" });
  } catch (error) {
      return res.status(500).json({ message: "Chấp nhận duyệt Error" });
  }
});

//Tu choi user lam seller 1
//http://localhost:3000/cpanel/user/reject-seller-by-id/:id
router.post('/reject-seller-by-id/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      
      await userController.checkUserByid(id, 1);
      return res.status(200).json({message: "Từ chối user làm seller" });
  } catch (error) {
      return res.status(500).json({ message: "Từ chối Error" });
  }
});
module.exports = router;
