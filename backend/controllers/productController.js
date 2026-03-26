const Product = require("../models/Product");
const collaborativeFiltering = require("../algorithms/collaborativeFiltering");
const geneticAlgorithm = require("../algorithms/geneticAlgorithm");
const reinforcementLearning = require("../algorithms/reinforcementLearning");
const { setCache, getCache } = require("../utils/cache");

// Add product
const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

// Get recommendations
const getRecommendations = async (req, res) => {
  const userId = req.params.userId;

  // Check cache
  const cached = await getCache(`recommendations:${userId}`);
  if (cached) return res.json(cached);

  // Hybrid recommendation
  const [cf, ga, rl] = await Promise.all([
    collaborativeFiltering(userId),
    geneticAlgorithm(),
    reinforcementLearning(userId),
  ]);

  // Merge and remove duplicates
  const merged = [...cf, ...ga, ...rl];
  const uniqueProducts = Array.from(new Set(merged.map((p) => p._id))).map(
    (id) => merged.find((p) => p._id.equals(id))
  );

  await setCache(`recommendations:${userId}`, uniqueProducts, 300); // cache 5 min

  res.json(uniqueProducts);
};

module.exports = { addProduct, getRecommendations };