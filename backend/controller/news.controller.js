const News = require("../models/news.model");

exports.createNews = async (req, res) => {
  const { title, subTitle, content, category, imageUrl } = req.body;

  try {
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
    const { category } = req.query;

    const filter = category ? { category } : {};

    const news = await News.find(filter)
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json(news);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch news", error: err.message });
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

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    if (news.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only update your own news" });
    }

    const { title, subTitle, category, content, imageUrl } = req.body;

    news.title = title || news.title;
    news.subTitle = subTitle || news.subTitle;
    news.category = category || news.category;
    news.content = content || news.content;
    news.imageUrl = imageUrl || news.imageUrl;

    await news.save();

    res.json({ message: "News Updated", news });
  } catch (err) {
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
