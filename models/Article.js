const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  image: {
    type: String,
  },
});
const ArticleModel = mongoose.model("Article", articleSchema);
module.exports = {
  ArticleModel,
};
