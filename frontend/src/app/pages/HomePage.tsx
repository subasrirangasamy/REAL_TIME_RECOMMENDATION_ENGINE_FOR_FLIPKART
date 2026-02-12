import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RecommendationSection } from "../components/RecommendationSection";
import { Product, mockProducts, categories } from "../data/mockProducts";
import { 
  getPersonalizedRecommendations, 
  getPopularProducts,
  getTrendingProducts,
  getCategoryRecommendations,
  getCurrentUserId,
  trackProductClick,
  initializeProductViewCounts
} from "../utils/recommendationEngine";
import { TrendingUp, Sparkles, Flame, Package } from "lucide-react";
import { Link } from "react-router";

export function HomePage() {
  const [personalizedProducts, setPersonalizedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [electronicsProducts, setElectronicsProducts] = useState<Product[]>([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    // Initialize product view counts
    initializeProductViewCounts(mockProducts);

    // Load recommendations
    setPersonalizedProducts(getPersonalizedRecommendations(userId, mockProducts, 10));
    setPopularProducts(getPopularProducts(mockProducts, 8));
    setTrendingProducts(getTrendingProducts(mockProducts, 8));
    setElectronicsProducts(getCategoryRecommendations("Electronics", mockProducts, 8));
  }, [userId]);

  const handleProductClick = (product: Product) => {
    trackProductClick(userId, product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Get personalized recommendations based on your interests
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded hover:bg-yellow-300 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Category Quick Links */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="flex-none px-6 py-2 bg-gray-100 hover:bg-blue-50 rounded-full text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Personalized Recommendations */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl text-gray-900">Recommended For You</h2>
          </div>
          <p className="text-gray-600 mb-6">Based on your browsing history and preferences</p>
          <RecommendationSection
            title=""
            products={personalizedProducts}
            onProductClick={handleProductClick}
          />
        </div>

        {/* Trending Products */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl text-gray-900">Trending Now</h2>
          </div>
          <RecommendationSection
            title=""
            products={trendingProducts}
            onProductClick={handleProductClick}
          />
        </div>

        {/* Popular Products */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl text-gray-900">Most Popular</h2>
          </div>
          <RecommendationSection
            title=""
            products={popularProducts}
            onProductClick={handleProductClick}
          />
        </div>

        {/* Electronics Category */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl text-gray-900">Top Electronics</h2>
          </div>
          <RecommendationSection
            title=""
            products={electronicsProducts}
            onProductClick={handleProductClick}
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg mb-2">Real-Time Recommendations</h3>
            <p className="text-gray-600 text-sm">
              Get instant product suggestions based on your activity
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg mb-2">Personalized Experience</h3>
            <p className="text-gray-600 text-sm">
              Discover products tailored to your preferences
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg mb-2">Trending Products</h3>
            <p className="text-gray-600 text-sm">
              Stay updated with what's hot in the market
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}