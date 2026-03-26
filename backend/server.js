// server.js
require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const connectMongoDB = async () => {
  try {
    await new Promise((res) => setTimeout(res, 500));
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
  }
};

connectMongoDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});