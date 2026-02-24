const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Insight = require("./models/Insight");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/analytics",
);

// GET Route to fetch all data
app.get("/api/data", async (req, res) => {
  try {
    const data = await Insight.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
