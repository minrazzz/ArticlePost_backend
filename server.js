const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
require("./database/Connection");
require("dotenv").config();

const { getUsers, addUser, loginUser } = require("./handlers/userHandlers");
const {
  getArticles,
  addArticle,
  editArticle,
} = require("./handlers/articleHandlers");
const { authToken } = require("./middleware/authenticate");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/uploads", express.static("uploads")); //to fetch the static imagen sdfdsklfj

// userhandlers
app.get("/user", authToken, getUsers);
app.post("/user/add", addUser);
app.post("/user/login", loginUser);

// articlehandlers
app.get("/article", getArticles);
app.post("/article/add", addArticle);
app.put("/article/edit/:id", editArticle);

try {
  app.listen(process.env.PORT, function () {
    console.log("port is listening at 8000");
  });
} catch (error) {
  console.log(error);
}
