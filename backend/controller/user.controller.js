// const { default: User } = require("../models/user.model");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");
const resetPasswordTemplate = require("../utils/emailTemplates/resetPasswordTemplate");
dotenv.config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // fallback to 1 day
    );

    // ✅ Send response with token
    // console.log(token);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not Exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    // console.log(token);
    res.status(200).json({
      message: "User Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(201).json({
      message: "Access Granted",
      users
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  // console.log("Received forgot password request for:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    // console.log("Reset link:", resetLink);

    // Temporarily replace real email with log
    await sendEmail(
      email,
      "Reset Your Password",
      resetPasswordTemplate(user.name, resetLink) // ✅ use template
    );
    // console.log("Send email to:", email);

    res.json({ message: "Reset link sent." });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // console.log("🧪 Token:", token);
  // console.log("🧪 Password:", password);

  try {
    const user = await User.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.tokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Reset error:", err.message);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
