import { Link } from "react-router";
import { Header } from "../components/Header";
import { Home, Search } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-9xl mb-8">404</div>
          <h1 className="text-4xl text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white rounded hover:bg-gray-50 transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
