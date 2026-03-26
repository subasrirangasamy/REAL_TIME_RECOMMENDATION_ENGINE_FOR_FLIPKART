import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu, Heart, TrendingUp, Store, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useState, useRef, useEffect } from "react";
import { useCategories, useAllProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const { cart, isLoggedIn, userName, logout, searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiSearching, setAiSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: categories = [] } = useCategories();
  const { data: allProducts = [] } = useAllProducts();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (!searchQuery.trim()) return;

    // Check if natural language query (longer or contains descriptive words)
    const isNatural = searchQuery.split(" ").length >= 3;
    if (isNatural) {
      setAiSearching(true);
      try {
        const { data, error } = await supabase.functions.invoke("ai-smart-search", {
          body: { query: searchQuery },
        });
        if (!error && data?.product_ids?.length > 0) {
          navigate(`/products?ai_ids=${data.product_ids.join(",")}&search=${encodeURIComponent(searchQuery)}&ai_summary=${encodeURIComponent(data.search_summary || "")}`);
          setAiSearching(false);
          return;
        }
      } catch { /* fallback to normal search */ }
      setAiSearching(false);
    }
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 0) {
      const matches = allProducts
        .filter((p) => p.title.toLowerCase().includes(value.toLowerCase()) || p.brand.toLowerCase().includes(value.toLowerCase()))
        .map((p) => p.title)
        .slice(0, 6);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center gap-4 py-2.5 px-4">
        <Link to="/" className="flex-shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-primary-foreground text-xl font-bold italic tracking-tight">Flipkart</span>
            <span className="text-[10px] text-primary-foreground/70 -mt-1 flex items-center gap-0.5">
              Explore <span className="text-deal font-medium">Plus</span> ✦
            </span>
          </div>
        </Link>

        <div ref={searchRef} className="flex-1 max-w-2xl hidden sm:block relative">
          <form onSubmit={handleSearch} className="flex w-full bg-card rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search for products, brands and more (try: 'phones under 20k with good camera')"
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className="flex-1 px-4 py-2 text-sm text-foreground bg-card outline-none"
            />
            <button type="submit" disabled={aiSearching} className="px-4 text-primary hover:bg-muted transition-colors flex items-center gap-1">
              {aiSearching ? (
                <Sparkles className="w-5 h-5 animate-pulse" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-b shadow-xl z-50 max-h-64 overflow-y-auto">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchQuery(s);
                    setShowSuggestions(false);
                    navigate(`/products?search=${encodeURIComponent(s)}`);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="line-clamp-1">{s}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-3 ml-auto">
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-1 text-primary-foreground text-sm font-medium px-2 py-1 hover:bg-primary/80 rounded transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline max-w-[80px] truncate">{userName}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full mt-1 bg-card rounded shadow-xl border border-border min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-xs text-muted-foreground">Hello,</p>
                  <p className="text-sm font-bold text-foreground">{userName}</p>
                </div>
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                  <TrendingUp className="w-4 h-4" /> My Orders
                </Link>
                <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                  <Heart className="w-4 h-4" /> Wishlist
                </Link>
                <Link to="/compare" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                  <Store className="w-4 h-4" /> Compare
                </Link>
                <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors border-t border-border">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-card text-primary font-medium text-sm px-6 py-1.5 rounded hover:shadow-lg transition-all hidden sm:block">
              Login
            </Link>
          )}

          <Link to="/products" className="hidden md:flex items-center gap-1 text-primary-foreground text-sm font-medium px-2 py-1 hover:bg-primary/80 rounded transition-colors">
            <Store className="w-4 h-4" />
            <span>Seller</span>
          </Link>

          <Link to="/cart" className="flex items-center gap-1 text-primary-foreground px-2 py-1 hover:bg-primary/80 rounded transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-deal text-deal-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="sm:hidden text-primary-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="bg-primary/90 border-t border-primary-foreground/10 hidden md:block">
        <div className="container mx-auto flex items-center gap-6 px-4 py-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
              className="text-primary-foreground/90 hover:text-primary-foreground text-xs font-medium whitespace-nowrap transition-colors hover:underline underline-offset-4">
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-primary/95 px-4 pb-3 space-y-2 animate-fade-up">
          <form onSubmit={handleSearch} className="flex bg-card rounded overflow-hidden">
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-foreground bg-card outline-none" />
            <button type="submit" className="px-3 text-primary"><Search className="w-4 h-4" /></button>
          </form>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                className="text-center text-[10px] text-primary-foreground/80 bg-primary-foreground/10 rounded py-2"
                onClick={() => setMobileMenuOpen(false)}>
                {cat}
              </Link>
            ))}
          </div>
          {!isLoggedIn && (
            <Link to="/login" className="block text-center bg-card text-primary font-medium text-sm py-2 rounded">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
