import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { useWishlist, useToggleWishlist } from "@/hooks/useWishlist";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, trackView, isLoggedIn } = useApp();
  const { data: wishlistIds = [] } = useWishlist();
  const { add, remove } = useToggleWishlist();
  const wishlisted = wishlistIds.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.brand} added to cart!`, { description: `₹${product.price.toLocaleString()}`, duration: 2000 });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist");
      return;
    }
    if (wishlisted) {
      remove.mutate(product.id);
      toast("Removed from wishlist", { duration: 1500 });
    } else {
      add.mutate(product.id);
      toast("Added to wishlist ❤️", { duration: 1500 });
    }
  };

  return (
    <div className="bg-card rounded border border-border hover:shadow-xl transition-all duration-300 group animate-fade-up flex flex-col relative">
      <button onClick={handleWishlist} className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-card/80 hover:bg-card shadow-sm transition-all">
        <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>
      {discount >= 20 && (
        <div className="absolute top-2 left-2 z-10 bg-success text-success-foreground text-[10px] font-bold px-2 py-0.5 rounded">
          {discount}% OFF
        </div>
      )}
      <Link to={`/product/${product.id}`} onClick={() => trackView(product.id)} className="block p-4">
        <div className="aspect-square overflow-hidden rounded flex items-center justify-center bg-muted/30 mb-3">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        </div>
        <p className="text-[10px] text-primary font-medium uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="bg-success text-success-foreground text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating} <Star className="w-3 h-3 fill-current" />
          </span>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Free delivery</p>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <button onClick={handleAddToCart} className="w-full bg-deal text-deal-foreground text-sm font-bold py-2.5 rounded hover:brightness-110 transition-all flex items-center justify-center gap-2 active:scale-95">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
