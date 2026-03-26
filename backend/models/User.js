const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  history: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      action: String, // view, click, purchase
      timestamp: Date,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);