const express = require("express");
const newsController = require("../controller/news.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const checkRole = require('../middleware/checkRole.js')

const router = express.Router();

router.post('/createNews', verifyToken.protect, checkRole("admin"), newsController.createNews);
router.post('/:id/summarize', newsController.summarize);
// ✅ keep specific routes BEFORE dynamic ones
router.get('/my-news', verifyToken.protect, checkRole('admin'), newsController.getMyNews);
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.put('/:id', verifyToken.protect, checkRole('admin'), newsController.updateNews);
router.delete('/:id', verifyToken.protect, checkRole("admin"), newsController.deleteNews);


module.exports = router;