const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    introduction: {
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
    author_id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    viewed: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
const ArticleModel = mongoose.model("Article", articleSchema);
module.exports = {
  ArticleModel,
};
