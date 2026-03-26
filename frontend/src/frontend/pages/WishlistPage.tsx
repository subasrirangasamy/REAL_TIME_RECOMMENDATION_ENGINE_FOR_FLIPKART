import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { useAllProducts } from "@/hooks/useProducts";
import { useApp } from "@/context/AppContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const WishlistPage = () => {
  const { isLoggedIn } = useApp();
  const { data: wishlistIds = [], isLoading: wLoading } = useWishlist();
  const { data: allProducts = [], isLoading: pLoading } = useAllProducts();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <Heart className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-foreground">Please login to view your wishlist</h2>
          <Link to="/login" className="inline-block mt-6 bg-primary text-primary-foreground font-medium px-8 py-2.5 rounded hover:opacity-90 transition-opacity">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = allProducts.filter((p) => wishlistIds.includes(p.id));
  const loading = wLoading || pLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-4 px-2 md:px-4">
        <div className="bg-card rounded shadow-sm p-4 mb-4">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive" /> My Wishlist ({wishlisted.length})
          </h1>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-72 w-full rounded" />)}
          </div>
        ) : wishlisted.length === 0 ? (
          <div className="bg-card rounded shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
            <Link to="/products" className="inline-block mt-4 text-primary font-medium hover:underline">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {wishlisted.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
