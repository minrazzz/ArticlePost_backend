const fs = require("fs");
const path = require("path"); //to get the extension of the filename
var jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils");
const { userModel } = require("../models/User");

module.exports = {
  authToken: async function (req, res, next) {
    try {
      // console.log("auth", req.cookies.auth);
      const token = req.cookies.auth || req.headers["authorization"];

      if (!token) {
        return res.send("Access denied");
      }

      const tokenInfo = verifyToken(token);

      const user = await userModel.findOne({
        email: tokenInfo.data.email,
        token: token,
      });
      if (!user) res.send("Access denied!!");
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.send("invalid token");
    }
  },

  imageValidation: function (mimetype, res) {
    if (!mimetype.startsWith("image")) {
      res.json({
        success: false,
        message: "Invalid file-type",
      });
      return false;
    }
    return true;
  },

  imageUpload: function (dir, imageFile) {
    let imageFileName = null;

    const hashedFileName = imageFile.md5;
    const extension = path.extname(imageFile.name);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    imageFileName = hashedFileName + extension;

    imageFile.mv(dir + "/" + imageFileName, function (err) {
      if (err) {
        res.json({
          success: false,
          message: "something went wrong",
        });
      }
    });
    return imageFileName;
  },
};
