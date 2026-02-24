const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Insight = require("./models/Insight");
require("dotenv").config();

const app = express();

// Update CORS to allow your production frontend URL
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  }),
);

app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/analytics",
);

// Health check route for Vercel/Render
app.get("/", (req, res) => {
  res.send("InsightDB API is running...");
});

// GET Route to fetch all data
app.get("/api/data", async (req, res) => {
  try {
    const data = await Insight.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
