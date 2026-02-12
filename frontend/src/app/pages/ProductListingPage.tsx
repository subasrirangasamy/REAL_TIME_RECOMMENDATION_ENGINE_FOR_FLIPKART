import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { Product, mockProducts, categories } from "../data/mockProducts";
import { getCurrentUserId, trackProductClick } from "../utils/recommendationEngine";
import { Filter, SlidersHorizontal } from "lucide-react";

export function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [showFilters, setShowFilters] = useState(true);
  const userId = getCurrentUserId();

  useEffect(() => {
    let products = [...mockProducts];

    // Apply search filter
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query)) ||
        p.brand.toLowerCase().includes(query)
      );
    }

    // Apply category filter from URL
    const categoryParam = searchParams.get("category");
    if (categoryParam && categoryParam !== "All") {
      setSelectedCategory(categoryParam);
      products = products.filter(p => p.category === categoryParam);
    } else if (selectedCategory !== "All") {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Apply price range filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        products.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }

    setFilteredProducts(products);
  }, [searchParams, selectedCategory, priceRange, sortBy]);

  const handleProductClick = (product: Product) => {
    trackProductClick(userId, product.id);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">
              {searchParams.get("search") 
                ? `Search Results for "${searchParams.get("search")}"` 
                : selectedCategory === "All" 
                  ? "All Products" 
                  : selectedCategory}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5" />
                  <h2 className="text-lg">Filters</h2>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-900 mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        onChange={() => setPriceRange([0, 500000])}
                        checked={priceRange[0] === 0 && priceRange[1] === 500000}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">All Prices</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        onChange={() => setPriceRange([0, 10000])}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Under ₹10,000</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        onChange={() => setPriceRange([10000, 50000])}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">₹10,000 - ₹50,000</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        onChange={() => setPriceRange([50000, 100000])}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">₹50,000 - ₹1,00,000</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        onChange={() => setPriceRange([100000, 500000])}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Above ₹1,00,000</span>
                    </label>
                  </div>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-900 mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 500000]);
                    setSortBy("popularity");
                  }}
                  className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 500000]);
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}