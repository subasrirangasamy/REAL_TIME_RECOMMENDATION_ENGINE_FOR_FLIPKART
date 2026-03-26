import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useAllProducts, useCategories } from "@/hooks/useProducts";
import { useSearchParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const searchFilter = searchParams.get("search") || "";
  const aiIds = searchParams.get("ai_ids") || "";
  const aiSummary = searchParams.get("ai_summary") || "";
  const [sortBy, setSortBy] = useState("relevance");

  const { data: allProducts = [], isLoading: productsLoading } = useAllProducts();
  const { data: categories = [] } = useCategories();

  const filtered = useMemo(() => {
    let result = allProducts;

    // AI search results
    if (aiIds) {
      const ids = aiIds.split(",");
      result = ids.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as typeof allProducts;
    } else {
      if (categoryFilter) result = result.filter((p) => p.category === categoryFilter);
      if (searchFilter)
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            p.tags.some((t) => t.includes(searchFilter.toLowerCase()))
        );
    }

    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [allProducts, categoryFilter, searchFilter, sortBy, aiIds]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-4 px-2 md:px-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="bg-card rounded shadow-sm p-4 sticky top-28">
              <h3 className="font-bold text-foreground mb-3">Categories</h3>
              <div className="space-y-1">
                <Link
                  to="/products"
                  className={`block text-sm py-1.5 px-2 rounded transition-colors ${!categoryFilter ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className={`block text-sm py-1.5 px-2 rounded transition-colors ${categoryFilter === cat ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="bg-card rounded shadow-sm p-4 mb-4 flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-bold text-foreground">{filtered.length}</span> results
                  {categoryFilter && <> in <span className="font-medium text-foreground">{categoryFilter}</span></>}
                  {searchFilter && <> for "<span className="font-medium text-foreground">{searchFilter}</span>"</>}
                </p>
                {aiSummary && (
                  <p className="text-xs text-primary mt-1 flex items-center gap-1">
                    ✨ AI: {aiSummary}
                  </p>
                )}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded px-3 py-1.5 bg-card text-foreground outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-72 w-full rounded" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-card rounded shadow-sm p-12 text-center">
                <p className="text-muted-foreground text-lg">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
