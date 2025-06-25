const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user.route.js");
const newsRoute = require("./routes/news.route.js");

const app = express();
dotenv.config();

// ✅ Apply CORS middleware before any route
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

// Built-in middleware for parsing JSON
app.use(express.json());

// API routes
app.use("/user", userRoute);
app.use("/news", newsRoute);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
