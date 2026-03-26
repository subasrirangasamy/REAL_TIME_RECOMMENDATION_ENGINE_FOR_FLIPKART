const Product = require("../models/Product");

// Genetic Algorithm inspired ranking
const geneticAlgorithm = async () => {
  const products = await Product.find({});

  // Step 1: Initialize population (products)
  let population = products.map((p) => ({
    product: p,
    fitness: p.popularity * 2 + Math.random() * 10,
  }));

  // Step 2: Select top half
  population.sort((a, b) => b.fitness - a.fitness);
  let topHalf = population.slice(0, Math.floor(population.length / 2));

  // Step 3: Crossover (combine attributes to generate new products)
  const offspring = [];
  for (let i = 0; i < topHalf.length - 1; i += 2) {
    const parent1 = topHalf[i].product;
    const parent2 = topHalf[i + 1].product;

    const child = new Product({
      name: parent1.name,
      category: parent1.category,
      price: (parent1.price + parent2.price) / 2,
      popularity: (parent1.popularity + parent2.popularity) / 2,
      tags: Array.from(new Set([...parent1.tags, ...parent2.tags])),
    });

    offspring.push({ product: child, fitness: child.popularity + Math.random() * 5 });
  }

  // Step 4: Mutation: randomly boost popularity of some products
  offspring.forEach((o) => {
    if (Math.random() < 0.3) o.fitness += 5;
  });

  // Step 5: Merge topHalf and offspring and pick top 10
  const merged = [...topHalf, ...offspring];
  merged.sort((a, b) => b.fitness - a.fitness);

  return merged.slice(0, 10).map((m) => m.product);
};

module.exports = geneticAlgorithm;