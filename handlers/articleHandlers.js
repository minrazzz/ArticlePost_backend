const { ArticleModel } = require("../models/Article");
const fs = require("fs");
const path = require("path"); //to get the extension of the filename

const getArticles = async (req, res) => {
  try {
    res.json({
      success: true,
      data: "up coming",
    });
  } catch (error) {
    console.log(error);
  }
};

//we use express file-upload lib for file upload
const addArticle = async (req, res) => {
  try {
    const body = req.body;
    const imageFile = req.files.image;
    const hashedFileName = imageFile.md5;

    //to get the extension of image file
    const extension = path.extname(imageFile.name);

    //mimetype describes file-type example "image/jpeg"
    if (!imageFile.mimetype.startsWith("image")) {
      res.json({
        success: false,
        message: "Invalid file-type",
      });
      return false;
    }

    //:we use existsSync to check whether the require folder exists
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }

    imageFile.mv(
      "uploads/" + Date.now() + hashedFileName + extension,
      function (err) {
        if (err) {
          res.json({
            success: false,
            message: "something went wrong",
          });
        }
      }
    );

    const article = new ArticleModel({
      title: body.title,
      description: body.description,
      author: body.author,
      image: "uploads/" + imageFile.name,
    });

    article.save();
    res.json({
      success: true,
      message: "Article created succesfully",
    });
  } catch (error) {}
};

const editArticle = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getArticles,
  addArticle,
  editArticle,
};
