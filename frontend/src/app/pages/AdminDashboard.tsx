import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { mockProducts, Product } from "../data/mockProducts";
import { 
  getRecommendationRules, 
  saveRecommendationRules,
  RecommendationRule,
  getProductViewCount
} from "../utils/recommendationEngine";
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Eye,
  Settings,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "rules">("overview");
  const [rules, setRules] = useState<RecommendationRule[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingRule, setEditingRule] = useState<RecommendationRule | null>(null);

  useEffect(() => {
    setRules(getRecommendationRules());
    // Get products with updated view counts
    const productsWithViews = mockProducts.map(p => ({
      ...p,
      viewCount: getProductViewCount(p.id)
    }));
    setProducts(productsWithViews.sort((a, b) => b.viewCount - a.viewCount));
  }, []);

  const handleRuleUpdate = (ruleId: string, updates: Partial<RecommendationRule>) => {
    const updatedRules = rules.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    );
    setRules(updatedRules);
    saveRecommendationRules(updatedRules);
  };

  const totalProducts = products.length;
  const totalViews = products.reduce((sum, p) => sum + p.viewCount, 0);
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(2);
  const inStockProducts = products.filter(p => p.inStock).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdmin />

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage products and recommendation settings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Overview
            </div>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === "products"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Products
            </div>
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === "rules"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Recommendation Rules
            </div>
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl text-gray-900 mb-1">{totalProducts}</div>
                <div className="text-sm text-gray-600">Total Products</div>
                <div className="text-xs text-green-600 mt-2">{inStockProducts} in stock</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl text-gray-900 mb-1">
                  {totalViews.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
                <div className="text-xs text-blue-600 mt-2">All time</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl text-gray-900 mb-1">{avgRating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
                <div className="text-xs text-gray-500 mt-2">Out of 5.0</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl text-gray-900 mb-1">
                  {rules.filter(r => r.enabled).length}
                </div>
                <div className="text-sm text-gray-600">Active Rules</div>
                <div className="text-xs text-gray-500 mt-2">Of {rules.length} total</div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl text-gray-900 mb-6">Top Viewed Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Rank</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Product</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Views</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Rating</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 10).map((product, index) => (
                      <tr key={product.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <span className="text-gray-900">#{index + 1}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <div className="text-sm text-gray-900">{product.name}</div>
                              <div className="text-xs text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">{product.category}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Eye className="w-4 h-4" />
                            {product.viewCount.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            {product.rating} ⭐
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {product.inStock ? (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                              Out of Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-gray-900">All Products</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm text-gray-600">Product</th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600">Category</th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600">Price</th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600">Views</th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600">Rating</th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600">Status</th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <div className="text-sm text-gray-900">{product.name}</div>
                              <div className="text-xs text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{product.category}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          ₹{product.price.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {product.viewCount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{product.rating}</td>
                        <td className="py-4 px-4">
                          {product.inStock ? (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === "rules" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl text-gray-900 mb-2">Recommendation Rules</h2>
              <p className="text-sm text-gray-600">
                Configure how the recommendation engine prioritizes different factors
              </p>
            </div>

            <div className="grid gap-6">
              {rules.map((rule) => (
                <div key={rule.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg text-gray-900">{rule.name}</h3>
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {rule.type}
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) => handleRuleUpdate(rule.id, { enabled: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Enabled</span>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-700">Weight</label>
                        <span className="text-sm text-gray-900">{rule.weight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={rule.weight}
                        onChange={(e) => handleRuleUpdate(rule.id, { weight: parseInt(e.target.value) })}
                        className="w-full"
                        disabled={!rule.enabled}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      {rule.type === "category" && "Recommends products from categories the user has shown interest in."}
                      {rule.type === "similarity" && "Recommends products similar to what the user has viewed."}
                      {rule.type === "popularity" && "Recommends products based on overall popularity and views."}
                      {rule.type === "collaborative" && "Recommends products based on what similar users have viewed."}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Changes to recommendation rules take effect immediately and will influence 
                the products shown to users across the platform.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}