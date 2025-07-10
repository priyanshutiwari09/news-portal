const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoute = require("./routes/user.route.js");
const newsRoute = require("./routes/news.route.js");

const app = express();
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectDB();

// ✅ Apply CORS middleware before any route
app.use(
  cors({
    origin: "http://localhost:5173" // ✅ change to your deployed frontend URL in production
  })
);

// Built-in middleware for parsing JSON
app.use(express.json());

// API routes
app.use("/user", userRoute);
app.use("/news", newsRoute);

// ✅ Serve frontend (SPA support)
// ✅ CORRECT: Go one level up to get the frontend folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
