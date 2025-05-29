// const { default: User } = require("../models/user.model");
const User = require("../models/user.model.js");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await new User({
      name,
      email,
      password
    });

    newUser
      .save()
      .then(() =>
        res.status(201).json({ message: "User registered Successfully" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
