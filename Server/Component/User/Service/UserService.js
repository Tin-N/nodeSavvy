const userModel=require('..//UserModel');
const bcrypt = require('bcrypt');


const login =  async (email,password) => {
  try {
    const user = await userModel.findOne({email: email});
    if(user){
      console.log(user.password);
        const result = bcrypt.compareSync(password, user.password);
        if(result)
        return user;
        else return null;
    }
    } catch (error) {
    console.error("Login Error"+error);
  }
  return false;
}



const register =  async (email,password,roleID) => {
  try {
    const user =  await userModel.findOne({email: email});
    if (user) {
      return false;
    }
    // Hash passwords
    const  salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password,salt);
    // Save user's information
    const newUser = {email:email,password:hash,roleID:roleID};
    const u =new userModel(newUser);
    await u.save();
    return true;
    } catch (error) {
    console.error("Register Error"+error);
  }
  return false;
}


const updateUser = async (email, password, role, isLogin) => {
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {

            user.password = password ? password : user.password;
            user.role = role ? role : user.role;
            user.isLogin = isLogin ? isLogin : user.isLogin;

            await user.save();
            console.log("INFO USER:", user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error", error)
        return false;
    }
}

const changePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            // console.log("INFO USER:", user);
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
            if (isPasswordValid) {
                user.password = newPassword
                await user.save();
                return true;
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("Change Password got an error: ", error);
        throw error;
    }
}

const getById = async (id) => {
    try {
        const user = await userModel.findById({ _id:id });
        if (user != null) {
            return user
        } return false
    } catch (error) {
        console.log("Get product by id error " + error);
        return null;
    }
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




module.exports={login, register, updateUser, changePassword, getById};





