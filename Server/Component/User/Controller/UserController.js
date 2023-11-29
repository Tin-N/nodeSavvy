const userService = require("../Service/UserService");

const createToken = (_id) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

const login = async (email, password) => {
  return await userService.login(email, password);
};
const register = async (email,password) => {
  return await userService.register(email,password);
};

const loginGoogle = async ( email, name, avatar) => {
  try {
      return await userService.loginGoogle( email, name, avatar);
  } catch (error) {
      return false;
  }
}
const changePassword = async (email, newPassword) => {
  try {
      return await userService.changePassword(email, newPassword);
  } catch (error) {
      throw error;
  }
}

const checkEmail = async (email) => {
  try {
      return await userService.checkEmail(email);
  } catch (error) {
      throw error;
  }
}

const changeUserInfo = async (id, address, phoneNumber, fullname,avatar) => {
  try {
      return await userService.changeUserInfo(id, address, phoneNumber, fullname, avatar);
  } catch (error) {
      throw error;
  }
}
const verifyEmail = async (emailToken, email) => {
  try {
    return await userService.verifyEmail(emailToken, email);
} catch (error) {
    throw error;
}
}
const emailVerify = async (email) => {
  try {
    return await userService.emailVerify(email);
} catch (error) {
    console.log(error);
}
}

const getById = async (id) => {
try {
  return await userService.getById(id);
} catch (error) {
  console.log('getProductByID error(contr): ' + error);
  return false;
}
}

const getByRollID = async (roleID) =>{
  try {
    return await userService.getByRollID(roleID);
} catch (error) {
    console.log("Get seller censorship error: ", error);
}
return null
}

const checkUserByid = async (id, roleID) => {
  try {
      return await userService.checkUserByid(id, roleID);
  } catch (error) {
      return false;
  }
}
module.exports = { login,register,loginGoogle,changePassword, checkEmail,changeUserInfo,verifyEmail,emailVerify, getById, getByRollID, checkUserByid };
