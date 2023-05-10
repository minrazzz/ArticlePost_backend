var jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils");
module.exports = {
  authToken: function (req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.send("Access denied");
    }

    const tokenInfo = verifyToken(token);
    next();
  },
};
