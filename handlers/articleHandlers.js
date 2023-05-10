const { ArticleModel } = require("../models/Article");
const { imageValidation, imageUpload } = require("../middleware/authenticate");

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
    console.log(imageFile.mimetype);

    //mimetype describes file-type example "image/jpeg"
    if (!imageValidation(imageFile.mimetype, res)) {
      return false;
    }
    //:we use existsSync to check whether the require folder exists
    const imageFileName = imageUpload("uploads", imageFile);

    const article = new ArticleModel({
      title: body.title,
      description: body.description,
      author: body.author,
      image: "uploads/" + imageFileName,
    });

    article.save();
    res.json({
      success: true,
      message: "Article created succesfully",
    });
  } catch (error) {}
};

//Edit_Article
const editArticle = async (req, res) => {
  try {
    let imageFileName = null;
    const id = req.params.id;
    const body = req.body;

    if (req.files) {
      const imageFile = req.files.image;
      if (!imageValidation(imageFile.mimetype, res)) {
        return false;
      }
      imageFileName = imageUpload("uploads", imageFile);
    }

    const edit = await ArticleModel.findByIdAndUpdate(
      { _id: id },
      {
        title: body.title,
        description: body.description,
        author: body.author,
        image: imageFileName ? "uploads/" + imageFileName : null,
      }
    );
    res.json({
      success: true,
      message: "Article created succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getArticles,
  addArticle,
  editArticle,
};
