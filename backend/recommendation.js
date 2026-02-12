// Dummy "AI" model - rule-based recommendations
const products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Mouse", category: "Electronics" },
  { id: 3, name: "Shirt", category: "Clothing" },
  { id: 4, name: "Jeans", category: "Clothing" },
  { id: 5, name: "Smartphone", category: "Electronics" },
];

// Simple function to get recommendations by category
function recommend(category) {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

module.exports = { recommend };
