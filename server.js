const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
require("./database/Connection");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//UserHAndlers
const {
  getUsers,
  addUser,
  loginUser,
  changePassword,
  getProfileInfo,
} = require("./handlers/userHandlers");

//Article handlers
const {
  getArticles,
  addArticle,
  editArticle,
  deleteArticle,
  getArticleByID,
} = require("./handlers/articleHandlers");

//middleware
const { authToken } = require("./middleware/authenticate");

app.use(cors({ credentials: true, origin: " http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());

app.use("/uploads", express.static("uploads")); //to fetch the static imagen sdfdsklfj

// userhandlers
app.get("/user", authToken, getUsers);
app.post("/user/add", addUser);
app.post("/user/login", loginUser);

//token_info
app.post("/profile_info", authToken, getProfileInfo);

//password change
app.patch("/user/change-password/:id", changePassword);

// articlehandlers
app.get("/article", getArticles);
app.get("/article/:id", getArticleByID);
app.post("/article/add", authToken, addArticle);
app.put("/article/edit/:id", authToken, editArticle);
app.delete("/article/delete/:id", authToken, deleteArticle);

try {
  app.listen(process.env.PORT, function () {
    console.log("port is listening at 8000");
  });
} catch (error) {
  console.log(error);
}
