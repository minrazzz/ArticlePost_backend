const fs = require("fs");
const path = require("path"); //to get the extension of the filename
var jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils");

module.exports = {
  authToken: function (req, res, next) {
    try {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
      if (!token) {
        return res.send("Access denied");
      }

      const tokenInfo = verifyToken(token);
      next();
    } catch (error) {
      console.log(error);
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
