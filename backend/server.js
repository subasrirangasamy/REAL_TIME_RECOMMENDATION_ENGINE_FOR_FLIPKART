require('dotenv').config();
const express = require('express');
const { recommend } = require('./recommendation');

const app = express();
const PORT = process.env.PORT || 5000;

// Root route for testing connectivity
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// Recommendation route (simulate AI model)
app.get('/recommend/:category', (req, res) => {
  const category = req.params.category;
  const recommendations = recommend(category);
  if (recommendations.length === 0) {
    res.json({ category, message: "No recommendations found" });
  } else {
    res.json({ category, recommendations });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
