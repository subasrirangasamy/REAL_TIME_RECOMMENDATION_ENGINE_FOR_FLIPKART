import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryBar from "@/components/CategoryBar";
import ProductSection from "@/components/ProductSection";
import DealsStrip from "@/components/DealsStrip";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { useTrending, useDealsOfTheDay, useTopRated, useBudgetPicks, useAllProducts } from "@/hooks/useProducts";

const Index = () => {
  const { recentlyViewed, cart } = useApp();
  const { data: allProducts = [] } = useAllProducts();
  const { data: trending = [] } = useTrending();
  const { data: dealsProducts = [] } = useDealsOfTheDay();
  const { data: topRated = [] } = useTopRated();
  const { data: budgetPicks = [] } = useBudgetPicks();

  const recentProducts = allProducts.filter((p) => recentlyViewed.includes(p.id));
  const cartIds = cart.map((i) => i.product.id);

  // Simple content-based recommendations from viewed/carted items
  const interactedProducts = allProducts.filter(
    (p) => recentlyViewed.includes(p.id) || cartIds.includes(p.id)
  );
  const interactedCategories = [...new Set(interactedProducts.map((p) => p.category))];
  const interactedTags = [...new Set(interactedProducts.flatMap((p) => p.tags))];

  const recommended = allProducts
    .filter((p) => !recentlyViewed.includes(p.id) && !cartIds.includes(p.id))
    .map((p) => {
      let score = 0;
      if (interactedCategories.includes(p.category)) score += 3;
      p.tags.forEach((t) => { if (interactedTags.includes(t)) score += 1; });
      score += p.rating;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.product);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-3 px-2 md:px-4 space-y-3">
        <BannerCarousel />
        <CategoryBar />
        <DealsStrip />
        <ProductSection title="Trending Now 🔥" products={trending} viewAllLink="/products" />
        <ProductSection title="Top Rated ⭐" products={topRated} viewAllLink="/products" />
        <ProductSection title="Budget Picks Under ₹15,000 💰" products={budgetPicks} viewAllLink="/products" />
        {recentProducts.length > 0 && (
          <ProductSection title="Based on Your Recently Viewed 👀" products={recentProducts} />
        )}
        {recommended.length > 0 && (
          <ProductSection title="Recommended for You ✨" products={recommended} viewAllLink="/products" />
        )}
        <ProductSection title="Best Deals 🏷️" products={dealsProducts} viewAllLink="/products" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
