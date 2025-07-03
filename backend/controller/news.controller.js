// const { model } = require("mongoose");
const News = require("../models/news.model");
const dotenv = require("dotenv");
dotenv.config();
// const OpenAI = require("openai");
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });
const axios = require("axios");
// controller/news.controller.js
const cloudinary = require("../utils/cloudinary.js");

// const cloudinary = require("../utils/cloudinary"); // ensure this path is correct

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

    // Case 1: Upload to Cloudinary if file provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mern-news"
      });
      imageUrl = result.secure_url;
    }
    // Case 2: Use image URL from body (pasted)
    else if (imageUrlFromBody && imageUrlFromBody.trim()) {
      imageUrl = imageUrlFromBody.trim();
    }

    // Validate image existence
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

exports.getAllNews = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const filter = category ? { category } : {};

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Total count for pagination
    const totalCount = await News.countDocuments(filter);

    // Get paginated news
    const news = await News.find(filter)
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const totalPages = Math.ceil(totalCount / limitNumber);

    res.status(200).json({
      news,
      totalPages
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch news",
      error: err.message
    });
  }
};

exports.getMyNews = async (req, res) => {
  const news = await News.find({ createdBy: req.user.id }).sort({
    createdBy: -1
  });

  res.status(201).json(news);
};

exports.getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;

    const newsItem = await News.findById(newsId).populate("createdBy", "name");
    // 👆 This includes only the "name" field from User collection

    if (!newsItem) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(newsItem);
  } catch (err) {
    console.error("Error fetching news:", err.message);
    res.status(500).json({
      message: "Failed to fetch news",
      error: err.message
    });
  }
};

// const cloudinary = require("cloudinary").v2; // Make sure cloudinary is configured properly

exports.updateNews = async (req, res) => {
  try {
    // 1. Find the news item
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    // 2. Authorization check
    if (news.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    // 3. Extract fields from body
    const {
      title,
      subTitle,
      category,
      content,
      imageUrl: imageUrlFromBody
    } = req.body;

    let imageUrl = news.imageUrl;

    // 4. Handle image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mern-news"
      });
      imageUrl = result.secure_url;
    } else if (imageUrlFromBody && imageUrlFromBody.trim()) {
      imageUrl = imageUrlFromBody.trim();
    }

    // 5. Update fields (only if provided)
    news.title = title || news.title;
    news.subTitle = subTitle || news.subTitle;
    news.category = category || news.category;
    news.content = content || news.content;
    news.imageUrl = imageUrl;

    // 6. Save updated document
    await news.save();

    // 7. Respond
    res.json({ message: "News Updated", news });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(400).json({ message: "Update Failed", error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

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

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

// controllers/newsController.js
exports.summarize = async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "No content provided" });

  try {
    // ✅ Define the variable before using
    const trimmedContent = content.slice(0, 1000); // Optional limit to avoid timeout

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Falconsai/text_summarization",
      {
        inputs: trimmedContent
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}` // replace this
        },
        timeout: 30000 // optional
      }
    );

    const summary = response.data[0]?.summary_text || "No summary returned.";
    res.json({ summary });
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Summarization failed" });
  }
};
