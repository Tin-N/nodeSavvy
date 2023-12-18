
const userModel = require("../UserModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // may be sai dấu ' hoặc "
const { sendVerificationEmail } = require("../../utils/sendVerificationEmail");


const createToken = () => {
    let code = '';
    
    for (let i = 0; i < 4; i++) {
      // Sinh số ngẫu nhiên từ 0 đến 9
      const randomNumber = Math.floor(Math.random() * 10);
      code += randomNumber.toString();
    }
    return code;
  };

const login = async (email, password) => {
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      console.log(user.password);
      const result = bcrypt.compareSync(password, user.password);
      if (result) return user;
      else return null;
    }
  } catch (error) {
    console.error("Login Error" + error);
  }
  return false;
};

const register = async (email, password) => {
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return false;
    }
    // Hash passwords
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    // Save user's information
    const newUser = {
      email: email,
      password: hash,
      emailToken: createToken(),
    };
    const u = new userModel(newUser);
    await u.save();
    return true;
  } catch (error) {
    console.error("Register Error" + error);
  }
  return false;
};

// Add Phone Number

// const updateUser = async (email, password, role, isLogin) => {
//     try {
//         const user = await userModel.findOne({ email: email })
//         if (user) {

//             user.password = password ? password : user.password;
//             user.role = role ? role : user.role;
//             user.isLogin = isLogin ? isLogin : user.isLogin;

//             await user.save();
//             console.log("INFO USER:", user);

//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.log("Update User  error", error)
//         return false;
//     }
// }

const checkEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email: email }).exec();
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Mail not exist ", error);
  }
};

const changePassword = async (email, newPassword) => {
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      // console.log("INFO USER:", user);
     
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(newPassword, salt);
        console.log("hash", hash);
        user.password = hash;
        await user.save();
        return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Change Password got an error: ", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const user = await userModel.findById({ _id: id });
    if (user != null) {
      return user;
    }
    return false;
  } catch (error) {
    console.log("Get product by id error " + error);
    return null;
  }
};


const getByRollID = async () =>{
  try {
    return await userModel.find({ roleID: 2})
} catch (error) {
    console.log("Get seller censorship error: ", error);
    return null;
}
}

const checkUserByid = async (id, roleID) => {
  // try {
      const user = await userModel.findById(id);
      if (user) {
        user.roleID = roleID ? roleID : user.roleID;
          
          return await user.save();
      }
      return false;
  // } catch (error) {
  //     console.log('Check user by id error: ', error);
  //     return false;
  // }
}
// const loginGoogle = async (email, name) => {
//   try {
//       const user = await userModel.findOne({ email: email })
//       if (user) {
//           // user.isLogin = true;
//           return user;
//       } else {
//           const newUser = { email, name };
//           const u = new userModel(newUser);
//           await u.save();
//           user.isLogin = true;

//           return newUser;
//       }
//   } catch (error) {
//       console.log('loginGoogle error' + error)
//       return false;
//   }
// }

//Change User INfo
const changeUserInfo = async (id, address, phoneNumber, fullname, avatar) => {
  const user = await userModel.findOne({ _id: id });
  console.log("INFO USER:", user);
  if (user) {
    user.address = address ? address : user.address;
    user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;
    user.fullname = fullname ? fullname : user.fullname;
    user.avatar = avatar ? avatar : user.avatar;
    await user.save();
    console.log("INFO USER:", user);
    return true;
  } else {
    return false;
  }
};

const verifyEmail = async (emailToken, email) => {
  try{
    if (!emailToken) {
      return false;
    }
    const user = await userModel.findOne({ emailToken: emailToken , email: email});

    if(user){
      user.isVerified = true;
      user.emailToken = null;
      await user.save();

      // createToken();
      return true;
    }
    return false;
  }catch(error){
    console.log("Verify Email got an error: ", error);
  }
};

const emailVerify = async (email) => {
  // try{
    const user = await userModel.findOne({ email: email});
    if(user){
      const emailToken = createToken();
      user.emailToken = emailToken;
      await user.save();
      sendVerificationEmail(email, emailToken);
      console.log("INFO USER:", user);
      return user;

    }
    return false;
  // }catch(error){
  //   console.log("Verify Email got an error: ", error);
  //   throw error;  
  // }
};
const getUserByName = async (size,page)=>{
  try {
      const result = await userModel.find(
      ).sort({_id:1}).limit(size?size:10).skip(page);
      const count =await userModel.find().count();
      if(result)
        return {result:result,count:count};
      return null;
  } catch (error) {
      console.log(error);
  }
}
const disableUser= async (id)=>{
  try {
      const user= await userModel.findByIdAndUpdate(id,{isDisabled:true});
      return user
  } catch (error) {
      console.log("DisableUser service"+error);
      return null
  }
}
const activateUser= async (id)=>{
  try {
      const user= await userModel.findByIdAndUpdate(id,{isDisabled:false});
      return user
  } catch (error) {
      console.log("activateUser service"+error);
      return null
  }
}
module.exports = {
  disableUser,
  activateUser,
  login,
  register,
  changePassword,
  getById,
  checkEmail,
  changeUserInfo,
  verifyEmail,
  emailVerify,
  getByRollID,
  checkUserByid,
  getUserByName
};
