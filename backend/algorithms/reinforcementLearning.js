const Product = require("../models/Product");
const User = require("../models/User");
//reward products based on user actions, with decay
const reinforcementLearning = async (userId) => {
  const user = await User.findById(userId).populate("history.productId");
  if (!user) return [];

  const productScores = {};
  const decayFactor = 0.9; // older actions have less weight

  user.history.forEach((h, idx) => {
    const pid = h.productId._id.toString();
    productScores[pid] = productScores[pid] || 0;

    // Assign reward
    let reward = 0;
    if (h.action === "view") reward = 1;
    else if (h.action === "click") reward = 3;
    else if (h.action === "purchase") reward = 5;

    // Apply decay for older actions
    reward *= Math.pow(decayFactor, user.history.length - idx - 1);

    productScores[pid] += reward;
  });

  // Sort top 10 products
  const topProductIds = Object.entries(productScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => id);

  return Product.find({ _id: { $in: topProductIds } });
};

module.exports = reinforcementLearning;