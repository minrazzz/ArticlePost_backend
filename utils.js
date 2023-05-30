var jwt = require("jsonwebtoken");
const { ArticleModel } = require("./models/Article");
require("dotenv").config();

module.exports = {
  createToken: function (payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "10000h",
    });
    return token;
  },

  verifyToken: function (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  },

  comment: async function (messages, successs) {
    const articleId = req.body.articleId;
    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.json({
        success: successs,
        message: messages,
      });
    }
  },
};
