import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem, Product } from "@/types/product";
import { useAuth } from "@/hooks/useAuth";
import { signIn, signUp, signOut } from "@/services/authService";
import { trackInteraction } from "@/services/interactionService";

interface AppState {
  cart: CartItem[];
  recentlyViewed: string[];
  isLoggedIn: boolean;
  userName: string;
  userId: string | null;
  authLoading: boolean;
  searchQuery: string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  trackView: (productId: string) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setSearchQuery: (q: string) => void;
  cartTotal: number;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = !!user;
  const userName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "";
  const userId = user?.id || null;

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    if (userId) trackInteraction(userId, product.id, "cart");
  }, [userId]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
      );
    }
  }, []);

  const trackView = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
    if (userId) trackInteraction(userId, productId, "view");
  }, [userId]);

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    await signIn(email, password);
  }, []);

  const registerWithEmail = useCallback(async (email: string, password: string, name: string) => {
    await signUp(email, password, name);
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setCart([]);
    setRecentlyViewed([]);
  }, []);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart, recentlyViewed, isLoggedIn, userName, userId, authLoading, searchQuery,
        addToCart, removeFromCart, updateQuantity, trackView,
        loginWithEmail, registerWithEmail, logout, setSearchQuery, cartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
