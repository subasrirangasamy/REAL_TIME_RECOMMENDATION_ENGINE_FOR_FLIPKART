import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RecommendationSection } from "../components/RecommendationSection";
import { Product, mockProducts } from "../data/mockProducts";
import { 
  getSimilarProducts, 
  trackProductView, 
  getCurrentUserId,
  trackProductClick,
  getProductViewCount
} from "../utils/recommendationEngine";
import { Star, ShoppingCart, Heart, Share2, Eye, TrendingUp } from "lucide-react";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [viewCount, setViewCount] = useState(0);
  const userId = getCurrentUserId();

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Track product view
        trackProductView(userId, foundProduct.id, foundProduct.category);
        
        // Get similar products
        const similar = getSimilarProducts(foundProduct, mockProducts, 8);
        setSimilarProducts(similar);
        
        // Get view count
        setViewCount(getProductViewCount(foundProduct.id));
      }
    }
  }, [id, userId]);

  const handleSimilarProductClick = (clickedProduct: Product) => {
    trackProductClick(userId, clickedProduct.id);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg">Product not found</p>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-2xl px-6 py-3 bg-red-600 rounded">
                      Out of Stock
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded text-lg">
                    {discount}% OFF
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                </button>
              </div>
              
              <div className="flex gap-4 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
              <h1 className="text-3xl text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating and Views */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-green-700 text-white px-3 py-1 rounded">
                  <span className="text-lg">{product.rating}</span>
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <span className="text-gray-600">
                  {product.reviewCount.toLocaleString()} Reviews
                </span>
                <div className="flex items-center gap-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{viewCount} views</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-4xl text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-xl text-green-600">
                      {discount}% off
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">Inclusive of all taxes</div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg text-gray-900 mb-3">Product Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h2 className="text-lg text-gray-900 mb-3">Specifications</h2>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Brand</span>
                    <span className="text-gray-900">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Category</span>
                    <span className="text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Rating</span>
                    <span className="text-gray-900">{product.rating} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-lg text-gray-900 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Recommendations */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl text-gray-900">Similar Products You May Like</h2>
          </div>
          <RecommendationSection
            title=""
            products={similarProducts}
            onProductClick={handleSimilarProductClick}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}