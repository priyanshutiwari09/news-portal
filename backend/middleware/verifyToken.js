const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify and decode
    req.user = decoded; // ✅ Save user info to request
    next(); // ✅ Continue to protected route
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
