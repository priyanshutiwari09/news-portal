const userController = require("../controller/user.controller.js");
const jwtFile = require("../Token/jwt.js");

const express = require("express");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/profile", jwtFile.protect, userController.profile);

module.exports = router;
