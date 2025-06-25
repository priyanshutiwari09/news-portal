const userController = require("../controller/user.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

const express = require("express");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
// router.get("/profile", verifyToken.protect, userController.profile);

module.exports = router;
