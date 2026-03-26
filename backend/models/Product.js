const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  popularity: Number,
  tags: [String],
});

module.exports = mongoose.model("Product", productSchema);