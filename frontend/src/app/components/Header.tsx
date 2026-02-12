import { Link, useNavigate } from "react-router";
import { Search, ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  isAdmin?: boolean;
}

export function Header({ isAdmin = false }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white text-blue-600 px-3 py-1 rounded italic">
              <span className="text-xl">Flipkart</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 pr-10 rounded text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Admin</span>
              </Link>
            )}
            <Link 
              to="/products" 
              className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Products
            </Link>
            <button className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded transition-colors">
              <User className="w-5 h-5" />
              <span>Account</span>
            </button>
            <button className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
