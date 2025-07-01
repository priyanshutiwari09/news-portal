const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // ✅ must be .v2 already

const storage = new CloudinaryStorage({
  cloudinary, // ✅ pass correct v2 object
  params: {
    folder: "news-images", // 👈 optional folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

const upload = multer({ storage });

module.exports = upload;
