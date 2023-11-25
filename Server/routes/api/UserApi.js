var express = require("express");
var router = express.Router();

const userController = require("../../Component/User/Controller/UserController");

// http://localhost:3000/api/UserApi/login
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
      const { email, password } = req.query;
      // console.log(email, password, name, description, gender, dob, avatar, role, createAt, updateAt, isLogin)
      const user = await userController.register(email, password);
      // console.log(user)
      if (user) {
          return res.status(200).json({ result: true, user: user, message: "Register Success" });
      }
      return res.status(400).json({ result: false, user: null, message: "Register Failed" });
  } catch (error) {
      return res.status(500).json({ result: false, user: null })
  }
});
// http://localhost:3000/api/UserApi/change-password
router.post('/change-password', [], async (req, res, next) => {

  const { email, newPassword } = req.query;
  // console.log(email, oldPassword, newPassword)
//   try {
      const user = await userController.changePassword(email, newPassword);
      console.log(user)
      if (user) {
          return res.status(200).json({ result: true, message: "Change Password Success" })
          
      } else {
          return res.status(400).json({ result: false, massage: "Change Password Failed" })
      }
//   } catch (error) {
//       res.status(500).json({ message: 'Lỗi máy chủ' });
//   }
});
// http://localhost:3000/api/UserApi/get-by-id/
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

// http://localhost:3000/api/UserApi/check-email
router.post('/check-email', async (req, res, next) => {
  try {
      const { email } = req.query;
      const user = await userController.checkEmail(email);
      if (user) {
          return res.status(200).json({ result: true, user: user, error: false });
      }
      return res.status(400).json({ result: false, user: null, error: true });

  } catch (error) {
      return res.status(500).json({ result: false, product: null, error: error });
  }

});
// http://localhost:3000/api/UserApi/changeUserInfo
router.post('/changeUserInfo', [], async (req, res, next) => {

  const { id, address, phoneNumber, fullname,avatar } = req.query;

      const user = await userController.changeUserInfo(id, address, phoneNumber, fullname, avatar);
      console.log(user)
      if (user) {
          return res.status(200).json({ result: true, message: "Change User in4 Success" })
      } else {
          return res.status(400).json({ result: false, massage: "Change User in4 Failed" })
      }
});
// http://localhost:3000/api/UserApi/verify-email
router.post('/verify-email', [], async (req, res, next) => {

  const { emailToken, email } = req.query;

      const user = await userController.verifyEmail(emailToken, email);
      console.log(user)
      if (user) {
          return res.status(200).json({ result: true, message: "Verify Email Success" })
      }
          return res.status(200).json({ result: false, massage: "Verify Email Failed" })
      
});

// http://localhost:3000/api/UserApi/email-verify
router.post('/email-verify', [], async (req, res, next) => {
    
      const { email } = req.query;
    
        const user = await userController.emailVerify(email);
        console.log(user, email)
        if (user) {
             res.status(200).json({ result: true, message: "Email Verify Success" })
        } else {
             res.status(400).json({ result: false, massage: "Email Verify Failed" })
        }
});

module.exports = router;