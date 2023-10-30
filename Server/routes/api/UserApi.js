var express = require("express");
var router = express.Router();

const userController = require("../../Component/User/Controller/UserController");

// http://localhost:3000/Api/UserApi/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.query;
    const user = await userController.login(email, password);
    if (user) {
      return res.status(200).json({ user: user });
    } else {
      console.error("" + user);
      return res.status(400).json({ result: false, user: null });
    }
    } catch (error) {
        console.error("Login error: " + error);
        return res.status(500).json({ result: false, user: null });
    }
});
// http://localhost:3000/Api/UserApi/loginGoogle
router.post('/loginGoogle', async (req, res, next) => {
  try {
      const { email, name } = req.query;
      const user = await userController.loginGoogle(email, name, avatar);
      if (user) {
          return res.status(200).json({ result: true, user: user, message: "Login Google Success" });
      }
      return res.status(400).json({ result: false, user: null, token: null, message: "Login Google Failed" });
  } catch (error) {
      return res.status(500).json({ result: false, message: 'Error System' })
  }
});
// http://localhost:3000/Api/UserApi/register
router.post('/register', [], async (req, res, next) => {
  try {
      const { email, password, roleID } = req.query;
      // console.log(email, password, name, description, gender, dob, avatar, role, createAt, updateAt, isLogin)
      const user = await userController.register(email, password, roleID);
      // console.log(user)
      if (user) {
          return res.status(200).json({ result: true, user: user, message: "Register Success" });
      }
      return res.status(400).json({ result: false, user: null, message: "Register Failed" });
  } catch (error) {
      return res.status(500).json({ result: false, user: null })
  }
});
// http://localhost:3000/Api/UserApi/change-password
router.post('/change-password', [], async (req, res, next) => {

  const { email, oldPassword, newPassword } = req.query;
  // console.log(email, oldPassword, newPassword)
//   try {
      const user = await userController.changePassword(email, oldPassword, newPassword);
      console.log(user)
      if (user) {
          res.status(200).json({ result: true, message: "Change Password Success" })
      } else {
          res.status(400).json({ result: false, massage: "Change Password Failed" })
      }
//   } catch (error) {
//       res.status(500).json({ message: 'Lỗi máy chủ' });
//   }
});
// http://localhost:3000/Api/UserApi/get-by-id/
router.get('/get-by-id/', async (req, res, next) => {
  try {
      const { id } = req.query;
      const user = await userController.getById(id);
      if (user) {
          return res.status(200).json({ result: true, user: user, error: false });
      }
      return res.status(400).json({ result: false, user: null, error: true });

  } catch (error) {
      return res.status(500).json({ result: false, product: null });
  }
});

// http://localhost:3000/Api/UserApi/searchByNameAndSort/
function calculatePage(countData) {
  const trangMoiTrang = 10;
  const soTrang = countData <= trangMoiTrang ? 1 : Math.ceil(countData / trangMoiTrang);
  return soTrang;
} 
router.get('/searchByNameAndSort/', async (req, res, next) => {
  try {
      const { 
        username,roleID,isDisabled,sortName,sortFullname,sortEmail,page} = req.query;
       console.log("page: "+page,isDisabled);
      const user = await userController.getUserByNameAndFilter(username,roleID,isDisabled,sortName,sortFullname,sortEmail,page);

      if (user) {
          const totalPage= calculatePage(user.countData)
          console.log(totalPage,user.countData,"TOTAL PAGES");

          return res.status(200).json({ result: true, user: user.result,totalPage:totalPage,count:user.countData, error: false });
      }
      return res.status(400).json({ result: false, user: user, error: true });

  } catch (error) {
    console.log(error);
      return res.status(500).json({ result: false, product: null });
  }
});
module.exports = router;