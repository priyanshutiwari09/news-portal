const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      require: true
    },
    confirmPassword: {
      type: String,
      require: true
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    resetToken: String,
    tokenExpiry: Date
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
