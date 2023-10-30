const userService = require("../Service/UserService");

const login = async (email, password) => {
  return await userService.login(email, password);
};
const register = async (email,password,roleID) => {
  return await userService.register(email,password,roleID);
};

const loginGoogle = async ( email, name, avatar) => {
  try {
      return await UserService.loginGoogle( email, name, avatar);
  } catch (error) {
      return false;
  }
}
const updateUser = async (email, password, name, description, gender, dob, avatar, role, createAt, updateAt, isLogin) => {
  try {
      return await UserService.updateUser(email, password, name, description, gender, dob, avatar, role, createAt, updateAt, isLogin);

  } catch (error) {
      return false;
  }
}
const changePassword = async (email, oldPassword, newPassword) => {
  try {
      return await UserService.changePassword(email, oldPassword, newPassword);
  } catch (error) {
      throw error;
  }
}
const sendVerifyCode = async (email, subject, verifyCode) => {

  try {
      const mailOptions = {
          from: "Lucas <nguyenvanson2622003@gmail.com>",
          to: email,
          subject: subject,
          html: "Your authentication code is : " + verifyCode
      }
      await UserModel.updateOne({ email }, { verificationCode: verifyCode, });

      return await transporter.sendMail(mailOptions);

  } catch (error) {
      console.log("Send email error:", error);
  }
  return false;
}
const verifyCode = async (email, verifyCode) => {
  try {
      const user = await UserModel.findOne({ email });
      console.log(user)
      if (user) {
          if (user.verificationCode === verifyCode) {
              console.log(user.verificationCode)
              await UserModel.updateOne({ email }, { isVerified: true });
              return true;
          } else {
              return false;

          }
      } else {
          return false;
      }
  } catch (error) {
      console.log("Verify email error:", error);

  }
}
const getUserByNameAndFilter = async (username,roleID,isDisabled,sortName,sortFullname,sortEmail,page) => {
  try {
    let skipPage=0;
      
    if((typeof limitData !== 'undefined')&&(limitData>0))
    {
        if(page<=1)
        skipPage=0
        else if(page>1)
        skipPage=(page-1)*limitData;
    }
    else
    {
      if(page==1)
      skipPage=0
      else if(page>1)
      skipPage=(page-1)*10;

    }

    console.log("page: "+skipPage,isDisabled);
      return await userService.getUserByNameAndFilter(username,roleID,isDisabled,sortName,sortFullname,sortEmail,skipPage);
  } catch (error) {
      return null;
  }
}

const disableUser = async (id) => {
    try {
        return await userService.getById(id);
    } catch (error) {
        return null;
    }
  }

const getById = async (id) => {
    try {
        return await userService.getById(id);
    } catch (error) {
        return null;
    }
  }

module.exports = { disableUser,getUserByNameAndFilter,login,register,loginGoogle,updateUser,changePassword,sendVerifyCode,verifyCode,getById };
