require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Insight = require("./models/Insight");

const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/analytics";

const data = JSON.parse(fs.readFileSync("./jsondata.json", "utf-8"));

const importData = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB for import...");

    await Insight.create(data);
    console.log("Data successfully loaded!");
    process.exit();
  } catch (err) {
    console.error("Error during import:", err);
    process.exit(1);
  }
};

importData();
