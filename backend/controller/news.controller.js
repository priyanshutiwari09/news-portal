const News = require("../models/news.model");
const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");
const cloudinary = require("../utils/cloudinary.js");

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

// CREATE News
exports.createNews = async (req, res) => {
  const {
    title,
    subTitle,
    content,
    category,
    imageUrl: imageUrlFromBody
  } = req.body;

  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mern-news"
      });
      imageUrl = result.secure_url;
    } else if (imageUrlFromBody?.trim()) {
      imageUrl = imageUrlFromBody.trim();
    }

    if (!imageUrl) {
      return res
        .status(400)
        .json({ message: "Image is required (upload or URL)." });
    }

    const news = new News({
      title,
      subTitle,
      content,
      category,
      imageUrl,
      createdBy: req.user.id
    });

    await news.save();
    res.status(201).json({ message: "News Created", news });
  } catch (err) {
    res.status(400).json({ message: "Creation Failed", error: err.message });
  }
};

// GET All News (Paginated & Filtered)
exports.getAllNews = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const filter = category ? { category } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const totalCount = await News.countDocuments(filter);
    const news = await News.find(filter)
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      news,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch news", error: err.message });
  }
};

// GET My News (Admin)
exports.getMyNews = async (req, res) => {
  const news = await News.find({ createdBy: req.user.id }).sort({
    createdAt: -1
  });
  res.status(200).json(news);
};

// ✅ FIXED: GET News By ID
exports.getNewsById = async (req, res) => {
  try {
    const newsId = req.params.newsId;

    const newsItem = await News.findById(newsId).populate("createdBy", "name");

    if (!newsItem) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(newsItem);
  } catch (err) {
    console.error("Error fetching news:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch news", error: err.message });
  }
};

// ✅ FIXED: UPDATE News
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.newsId);
    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const {
      title,
      subTitle,
      category,
      content,
      imageUrl: imageUrlFromBody
    } = req.body;

    let imageUrl = news.imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mern-news"
      });
      imageUrl = result.secure_url;
    } else if (imageUrlFromBody?.trim()) {
      imageUrl = imageUrlFromBody.trim();
    }

    // Only update if fields are provided
    news.title = title || news.title;
    news.subTitle = subTitle || news.subTitle;
    news.category = category || news.category;
    news.content = content || news.content;
    news.imageUrl = imageUrl;

    await news.save();

    res.json({ message: "News Updated", news });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(400).json({ message: "Update Failed", error: err.message });
  }
};

// ✅ FIXED: DELETE News
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.newsId);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    if (news.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own news" });
    }

    await news.deleteOne();
    res.json({ message: "News Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// ✅ Summarize News
exports.summarize = async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "No content provided" });

  try {
    const trimmedContent = content.slice(0, 1000);

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Falconsai/text_summarization",
      { inputs: trimmedContent },
      {
        headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` },
        timeout: 30000
      }
    );

    const summary = response.data[0]?.summary_text || "No summary returned.";
    res.json({ summary });
  } catch (err) {
    console.error("❌ Summarization Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Summarization failed" });
  }
};
