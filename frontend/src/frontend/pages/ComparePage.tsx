import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useAllProducts } from "@/hooks/useProducts";
import { useApp } from "@/context/AppContext";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { X, Plus, Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MAX_COMPARE = 3;

const ComparePage = () => {
  const { data: allProducts = [], isLoading } = useAllProducts();
  const { addToCart } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const selectedProducts = useMemo(
    () => selectedIds.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as Product[],
    [selectedIds, allProducts]
  );

  const filteredProducts = useMemo(
    () =>
      allProducts
        .filter((p) => !selectedIds.includes(p.id))
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 10),
    [allProducts, searchTerm, selectedIds]
  );

  const addProduct = (id: string) => {
    if (selectedIds.length >= MAX_COMPARE) {
      toast.error(`You can compare up to ${MAX_COMPARE} products`);
      return;
    }
    setSelectedIds((prev) => [...prev, id]);
    setSearchTerm("");
    setShowPicker(false);
  };

  const removeProduct = (id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const specs = [
    { label: "Brand", key: "brand" as keyof Product },
    { label: "Category", key: "category" as keyof Product },
    { label: "Price", key: "price" as keyof Product, format: (v: any) => `₹${Number(v).toLocaleString()}` },
    { label: "Original Price", key: "originalPrice" as keyof Product, format: (v: any) => `₹${Number(v).toLocaleString()}` },
    { label: "Discount", key: null as any, compute: (p: Product) => `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF` },
    { label: "Rating", key: "rating" as keyof Product, format: (v: any) => `${v} ★` },
    { label: "Reviews", key: "reviewCount" as keyof Product, format: (v: any) => Number(v).toLocaleString() },
    { label: "In Stock", key: "inStock" as keyof Product, format: (v: any) => (v ? "✅ Yes" : "❌ No") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-2 md:px-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Compare Products</h1>

        {/* Product slots */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: MAX_COMPARE }).map((_, i) => {
            const product = selectedProducts[i];
            return (
              <div
                key={i}
                className="bg-card rounded-lg border border-border p-4 min-h-[250px] flex flex-col items-center justify-center relative"
              >
                {product ? (
                  <>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-destructive/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </button>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-32 h-32 object-contain mb-3"
                      />
                    </Link>
                    <p className="text-xs text-primary font-medium">{product.brand}</p>
                    <h3 className="text-sm font-medium text-foreground text-center line-clamp-2">{product.title}</h3>
                    <p className="text-lg font-bold text-foreground mt-2">₹{product.price.toLocaleString()}</p>
                    <button
                      onClick={() => {
                        addToCart(product);
                        toast.success("Added to cart!");
                      }}
                      className="mt-2 bg-deal text-deal-foreground text-xs font-bold py-1.5 px-4 rounded flex items-center gap-1 hover:brightness-110 transition-all"
                    >
                      <ShoppingCart className="w-3 h-3" /> Add to Cart
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowPicker(true)}
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-sm">Add Product</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Picker Modal */}
        {showPicker && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPicker(false)}>
            <div className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-[70vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-border">
                <h3 className="font-bold text-foreground mb-2">Select a Product</h3>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or brand..."
                  className="w-full border border-border rounded px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 ring-primary"
                  autoFocus
                />
              </div>
              <div className="overflow-y-auto flex-1 p-2">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addProduct(p.id)}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors text-left"
                  >
                    <img src={p.image} alt={p.title} className="w-12 h-12 object-contain rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.brand} · ₹{p.price.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No products found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedProducts.length >= 2 && (
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground bg-muted/50 w-36">Spec</th>
                  {selectedProducts.map((p) => (
                    <th key={p.id} className="text-center py-3 px-4 font-medium text-foreground bg-muted/50">
                      {p.brand}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, i) => {
                  const values = selectedProducts.map((p) =>
                    spec.compute
                      ? spec.compute(p)
                      : spec.format
                      ? spec.format(p[spec.key])
                      : String(p[spec.key] ?? "—")
                  );
                  // Highlight best value for price (lowest) and rating (highest)
                  const isBest = (idx: number) => {
                    if (spec.key === "price") return selectedProducts[idx].price === Math.min(...selectedProducts.map((p) => p.price));
                    if (spec.key === "rating") return selectedProducts[idx].rating === Math.max(...selectedProducts.map((p) => p.rating));
                    return false;
                  };

                  return (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 font-medium text-muted-foreground">{spec.label}</td>
                      {values.map((val, idx) => (
                        <td
                          key={idx}
                          className={`py-3 px-4 text-center ${isBest(idx) ? "text-success font-bold" : "text-foreground"}`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {selectedProducts.length < 2 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Select at least 2 products to compare them side-by-side</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ComparePage;
