const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  title: String,
  subTitle: String,
  content: String,
  category: {
    type: String,
    required: true
  },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
