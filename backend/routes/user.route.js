const userController = require("../controller/user.controller.js");

const express = require("express");
const router = express.Router();

router.post("/signup", userController.signup);

module.exports = router;
