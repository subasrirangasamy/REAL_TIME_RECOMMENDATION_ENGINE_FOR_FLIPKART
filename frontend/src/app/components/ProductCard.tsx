import { Product } from "../data/mockProducts";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router";
import { getProductViewCount } from "../utils/recommendationEngine";

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const viewCount = getProductViewCount(product.id);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
      onClick={handleClick}
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white px-4 py-2 bg-red-600 rounded">Out of Stock</span>
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
              {discount}% OFF
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {viewCount}
          </div>
        </div>
        
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded text-sm">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-white" />
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
