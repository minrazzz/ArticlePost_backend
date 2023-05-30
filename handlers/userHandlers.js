let otp = "";
const { userModel } = require("../models/User");
const { createToken, verifyToken } = require("../utils");

const generateOTP = () => {
  for (let i = 1; i <= 6; i++) {
    randomValue = Math.round(Math.random() * 9);
    otp += randomValue;
  }
  return otp;
};

// GET API

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    // console.log(users);
    res.json({
      user: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (req, res) => {
  try {
    const body = req.body;
    //   console.log(body.name);

    const user = new userModel({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const exists = await userModel.findOne({ email: body.email });
    if (exists) {
      res.json({
        success: false,
        message: "Email already exist",
      });
      return false;
    }

    // const OTPvalue = generateOTP();
    await user.save();

    return res.json({
      success: true,
      message: "user added succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// LOGIN API
const loginUser = async (req, res) => {
  const body = req.body;
  const user = await userModel.findOne({ email: body.email });

  if (!user) {
    res.json({
      success: false,
      message: "user not found",
    });
    return false;
  }

  const result = await user.comparePassword(body.password);

  if (!result) {
    res.json({
      success: false,
      message: "Invalid Email or Password",
    });
    return false;
  }

  const token = createToken({
    data: {
      user_id: user._id,
      name: user.name,
      email: user.email,
    },
  });
  user.token = token;
  await user.save();
  res.cookie("auth ", token);
  // console.log("auth");

  res.json({
    success: true,
    message: "Login successfully",
    data: {
      token,
      user_id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

//PAtch-Api
const changePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const user = await userModel.findOne({ _id: id });

    const result = await user.comparePassword(body.old_password);

    if (!result) {
      res.json({
        success: false,
        message: "Old password is wrong",
        user,
      });
      return false;
    }

    user.password = body.new_password;
    user.save();
    // console.log(user);

    res.json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfileInfo = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token)
      res.json({
        success: false,
        message: "user not found",
      });
    const tokenInfo = await verifyToken(token);
    return res.json({
      success: true,
      data: tokenInfo.data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
  changePassword,
  getProfileInfo,
};
