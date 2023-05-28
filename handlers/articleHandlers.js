const { ArticleModel } = require("../models/Article");
const { imageValidation, imageUpload } = require("../middleware/authenticate");
const moment = require("moment"); // require

const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    const finalArticles = [];

    articles.forEach((article) => {
      finalArticles.push({
        id: article._id,
        introduction: article.introduction,
        title: article.title,
        description: article.description,
        author: article.author,
        author_id: article.author_id,
        image: article.image,
        createdAt: article.createdAt,
      });
    });

    finalArticles.forEach((article) => {
      article.createdAt = moment(article.createdAt).fromNow();
    });

    if (!articles) {
      res.json({
        success: false,
        message: "article not found",
      });
    }
    res.json({
      success: true,
      data: finalArticles,
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
    // console.log(imageFile.mimetype);

    //mimetype describes file-type example "image/jpeg"
    if (!imageValidation(imageFile.mimetype, res)) {
      return false;
    }
    //:we use existsSync to check whether the require folder exists
    const imageFileName = imageUpload("uploads", imageFile);

    const article = new ArticleModel({
      title: body.title,
      introduction: body.introduction,
      description: body.description,
      author_id: body.author_id,
      author: body.author,

      image: "uploads/" + imageFileName,
    });

    article.save();
    res.json({
      success: true,
      message: "Article created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//Edit_Article
const editArticle = async (req, res) => {
  try {
    let imageFileName = null;
    const id = req.params.id;
    const body = req.body;

    const article = await ArticleModel.findById(id);

    if (!article) {
      res.json({
        success: false,
        message: "Article not found",
      });
    }
    // console.log(req.user._id);
    // console.log(article);
    // console.log(body);

    if (article.author_id !== req.user._id.toJSON()) {
      return res.json({
        success: false,
        message: "only author can edit",
      });
    }

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      if (!imageValidation(imageFile.mimetype, res)) {
        return false;
      }

      imageFileName = imageUpload("uploads", imageFile);
      article.image = imageFileName ? "uploads/" + imageFileName : null;
    }

    article.title = body.title;
    article.introduction = body.introduction;
    article.description = body.description;
    await article.save();

    // const edit = await ArticleModel.findByIdAndUpdate(
    //   { _id: id },
    //   {
    //     title: body.title,
    //     introduction: body.introduction,
    //     description: body.description,
    //     author: body.author,
    //     author_id: body.author_id,
    //     image: imageFileName ? "uploads/" + imageFileName : null,
    //   }
    // );
    res.json({
      success: true,
      message: "Article edited successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteArticle = async (req, res) => {
  const id = req.params.id;

  const article = await ArticleModel.findById(id);

  if (!article) {
    res.json({
      success: false,
      message: "Article not found",
    });
  }

  if (article.author_id !== req.user._id.toJSON()) {
    return res.json({
      success: false,
      message: "only author can delete!!",
    });
  }

  const deleteArticle = await ArticleModel.findByIdAndRemove({ _id: id }); //find by id and remove
  res.json({
    success: true,
    message: "Article Deleted successfully",
  });
};

const getArticleByID = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      res.json({
        success: false,
        data: null,
        message: "article not found",
      });
      return false;
    }
    res.json({
      success: true,
      message: "article found",
      data: article,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getArticles,
  addArticle,
  editArticle,
  deleteArticle,
  getArticleByID,
};
