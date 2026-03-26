import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import { useProduct, useAllProducts } from "@/hooks/useProducts";
import { useApp } from "@/context/AppContext";
import { useWishlist, useToggleWishlist } from "@/hooks/useWishlist";
import { Star, ShoppingCart, Zap, Truck, Shield, Heart, Sparkles, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, trackView, isLoggedIn } = useApp();
  const { data: product, isLoading } = useProduct(id || "");
  const { data: allProducts } = useAllProducts();
  const { data: wishlistIds = [] } = useWishlist();
  const { add, remove } = useToggleWishlist();
  const [aiDesc, setAiDesc] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const wishlisted = product ? wishlistIds.includes(product.id) : false;

  useEffect(() => {
    if (id) trackView(id);
  }, [id, trackView]);

  const generateAIDescription = async () => {
    if (!product) return;
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-product-description", {
        body: { title: product.title, brand: product.brand, category: product.category, price: product.price, tags: product.tags },
      });
      if (error) throw error;
      setAiDesc(data.description);
    } catch (e: any) {
      toast.error("Failed to generate AI description");
    } finally {
      setAiLoading(false);
    }
  };

  const handleWishlist = () => {
    if (!isLoggedIn) { toast.error("Please login to add to wishlist"); return; }
    if (!product) return;
    if (wishlisted) { remove.mutate(product.id); toast("Removed from wishlist"); }
    else { add.mutate(product.id); toast("Added to wishlist ❤️"); }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-4 px-2 md:px-4">
          <Skeleton className="h-4 w-48 mb-3" />
          <div className="bg-card rounded shadow-sm p-4 md:p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="h-96 w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <p className="text-muted-foreground text-lg">Product not found.</p>
          <Link to="/" className="text-primary font-medium mt-4 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = (allProducts || []).filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-4 px-2 md:px-4">
        <nav className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.brand}</span>
        </nav>

        <div className="bg-card rounded shadow-sm p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative flex items-center justify-center bg-muted/20 rounded-lg p-8">
              <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
              <button onClick={handleWishlist} className="absolute top-4 right-4 p-2 rounded-full bg-card shadow-md hover:scale-110 transition-transform">
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
              </button>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-medium text-foreground">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-success text-success-foreground text-sm font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                  {product.rating} <Star className="w-3.5 h-3.5 fill-current" />
                </span>
                <span className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} Ratings & Reviews</span>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-lg font-medium text-success">{discount}% off</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">inclusive of all taxes</p>
              </div>

              <p className="text-sm text-foreground/80 mt-4 leading-relaxed">{product.description}</p>

              {/* AI Description */}
              <div className="mt-4">
                {aiDesc ? (
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <p className="text-xs text-primary font-medium flex items-center gap-1 mb-2">
                      <Sparkles className="w-3.5 h-3.5" /> AI-Enhanced Description
                    </p>
                    <div className="prose prose-sm max-w-none text-foreground/80 [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5">
                      <ReactMarkdown>{aiDesc}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <button onClick={generateAIDescription} disabled={aiLoading}
                    className="text-xs text-primary flex items-center gap-1 hover:underline disabled:opacity-50">
                    {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {aiLoading ? "Generating..." : "Generate AI Description"}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">#{tag}</span>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => addToCart(product)}
                  className="flex-1 bg-deal text-deal-foreground font-bold py-3 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm">
                  <ShoppingCart className="w-5 h-5" /> ADD TO CART
                </button>
                <button onClick={() => { addToCart(product); }}
                  className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm">
                  <Zap className="w-5 h-5" /> BUY NOW
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 text-center">
                <div className="bg-muted/50 rounded p-3">
                  <Truck className="w-5 h-5 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground mt-1">Free Delivery</p>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <Shield className="w-5 h-5 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground mt-1">1 Year Warranty</p>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <span className="text-primary text-lg font-bold">₹</span>
                  <p className="text-xs text-muted-foreground mt-1">Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-4">
            <ProductSection title="Similar Products" products={related} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
