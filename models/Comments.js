const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    article: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    comments: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentsModel = mongoose.model("comments", commentsSchema);

module.exports = CommentsModel;
