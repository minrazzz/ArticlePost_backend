const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
require("./database/Connection");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
  getUsers,
  addUser,
  loginUser,
  changePassword,
} = require("./handlers/userHandlers");
const {
  getArticles,
  addArticle,
  editArticle,
  deleteArticle,
} = require("./handlers/articleHandlers");
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

//password change
app.patch("/user/change-password/:id", changePassword);

// articlehandlers
app.get("/article", getArticles);
app.post("/article/add", addArticle);
app.put("/article/edit/:id", editArticle);
app.delete("/article/delete/:id", deleteArticle);

try {
  app.listen(process.env.PORT, function () {
    console.log("port is listening at 8000");
  });
} catch (error) {
  console.log(error);
}
