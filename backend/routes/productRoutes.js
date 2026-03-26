const express = require("express");
const router = express.Router();
const {
  addProduct,
  getRecommendations,
} = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/recommendations/:userId", getRecommendations);

module.exports = router;