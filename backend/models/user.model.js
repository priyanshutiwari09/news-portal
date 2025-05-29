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
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
