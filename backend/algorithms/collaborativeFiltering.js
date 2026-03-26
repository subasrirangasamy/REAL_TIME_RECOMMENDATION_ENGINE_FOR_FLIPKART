const User = require("../models/User");
const Product = require("../models/Product");
const _ = require("lodash");

// Recommend products based on other users with similar behavior
const collaborativeFiltering = async (userId) => {
  const user = await User.findById(userId).populate("history.productId");
  if (!user) return [];

  // Step 1: Get categories user interacted with
  const userCategories = user.history.map((h) => h.productId.category);

  // Step 2: Find other users who interacted with similar categories
  const otherUsers = await User.find({
    _id: { $ne: userId },
    "history.productId": { $in: user.history.map((h) => h.productId._id) },
  }).populate("history.productId");

  // Step 3: Score products by frequency of other users interacting with them
  const productScores = {};
  otherUsers.forEach((u) => {
    u.history.forEach((h) => {
      const pid = h.productId._id.toString();
      productScores[pid] = productScores[pid] || 0;
      productScores[pid] += 1; // simple frequency score
    });
  });

  // Step 4: Remove products already interacted by the user
  user.history.forEach((h) => {
    const pid = h.productId._id.toString();
    delete productScores[pid];
  });

  // Step 5: Rank products
  const recommendedIds = Object.entries(productScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => id);

  const recommendedProducts = await Product.find({
    _id: { $in: recommendedIds },
  });

  return recommendedProducts;
};

module.exports = collaborativeFiltering;