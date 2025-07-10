// const express = require("express");
// const newsController = require("../controller/news.controller.js");
// const verifyToken = require("../middleware/verifyToken.js");
// const checkRole = require("../middleware/checkRole.js");
// const upload = require("../middleware/multer.js");

// const router = express.Router();

// // ✅ Specific routes before dynamic ones
// router.post("/create", verifyToken.protect, checkRole("admin"), upload.single("image"), newsController.createNews);
// router.post("/:newsId/summarize", newsController.summarize);
// router.get("/my-news", verifyToken.protect, checkRole("admin"), newsController.getMyNews);
// router.get("/", newsController.getAllNews);

// // ✅ Use descriptive param name :newsId to avoid future conflicts
// router.get("/:newsId", newsController.getNewsById);
// router.put("/:newsId", verifyToken.protect, checkRole("admin"), upload.single("image"), newsController.updateNews);
// router.delete("/:newsId", verifyToken.protect, checkRole("admin"), newsController.deleteNews);

// module.exports = router;

const express = require("express");
const newsController = require("../controller/news.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const checkRole = require("../middleware/checkRole.js");
const upload = require("../middleware/multer.js");

const router = express.Router();

// ✅ Clear and conflict-free routes
router.post("/create-news", verifyToken.protect, checkRole("admin"), upload.single("image"), newsController.createNews);
router.post("/summarize/:newsId", newsController.summarize);
router.get("/admin/my-articles", verifyToken.protect, checkRole("admin"), newsController.getMyNews);
router.get("/all", newsController.getAllNews);
router.get("/article/:newsId", newsController.getNewsById);
router.put("/article/:newsId", verifyToken.protect, checkRole("admin"), upload.single("image"), newsController.updateNews);
router.delete("/article/:newsId", verifyToken.protect, checkRole("admin"), newsController.deleteNews);

module.exports = router;
