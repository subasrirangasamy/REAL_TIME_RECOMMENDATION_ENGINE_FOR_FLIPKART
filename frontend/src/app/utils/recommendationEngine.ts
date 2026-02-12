import { Product } from "../data/mockProducts";

export interface UserActivity {
  userId: string;
  viewedProducts: string[];
  clickedProducts: string[];
  searchHistory: string[];
  categoryPreferences: Record<string, number>;
  lastActive: number;
}

export interface RecommendationRule {
  id: string;
  name: string;
  type: "category" | "similarity" | "popularity" | "collaborative";
  weight: number;
  enabled: boolean;
}

// Get user activity from localStorage
export const getUserActivity = (userId: string): UserActivity => {
  const stored = localStorage.getItem(`user_activity_${userId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    userId,
    viewedProducts: [],
    clickedProducts: [],
    searchHistory: [],
    categoryPreferences: {},
    lastActive: Date.now()
  };
};

// Save user activity to localStorage
export const saveUserActivity = (activity: UserActivity): void => {
  localStorage.setItem(`user_activity_${activity.userId}`, JSON.stringify(activity));
};

// Track product view
export const trackProductView = (userId: string, productId: string, category: string): void => {
  const activity = getUserActivity(userId);
  
  // Add to viewed products (keep last 50)
  if (!activity.viewedProducts.includes(productId)) {
    activity.viewedProducts.unshift(productId);
    if (activity.viewedProducts.length > 50) {
      activity.viewedProducts = activity.viewedProducts.slice(0, 50);
    }
  }
  
  // Update category preferences
  activity.categoryPreferences[category] = (activity.categoryPreferences[category] || 0) + 1;
  activity.lastActive = Date.now();
  
  saveUserActivity(activity);
  
  // Update product view count
  updateProductViewCount(productId);
};

// Track product click
export const trackProductClick = (userId: string, productId: string): void => {
  const activity = getUserActivity(userId);
  
  if (!activity.clickedProducts.includes(productId)) {
    activity.clickedProducts.unshift(productId);
    if (activity.clickedProducts.length > 30) {
      activity.clickedProducts = activity.clickedProducts.slice(0, 30);
    }
  }
  
  activity.lastActive = Date.now();
  saveUserActivity(activity);
};

// Update product view count
const updateProductViewCount = (productId: string): void => {
  const viewCounts = JSON.parse(localStorage.getItem('product_view_counts') || '{}');
  viewCounts[productId] = (viewCounts[productId] || 0) + 1;
  localStorage.setItem('product_view_counts', JSON.stringify(viewCounts));
};

// Get product view count
export const getProductViewCount = (productId: string): number => {
  const viewCounts = JSON.parse(localStorage.getItem('product_view_counts') || '{}');
  return viewCounts[productId] || 0;
};

// Calculate similarity between two products
const calculateSimilarity = (product1: Product, product2: Product): number => {
  let score = 0;
  
  // Same category
  if (product1.category === product2.category) {
    score += 40;
  }
  
  // Similar price range (within 30%)
  const priceDiff = Math.abs(product1.price - product2.price) / Math.max(product1.price, product2.price);
  if (priceDiff < 0.3) {
    score += 20;
  }
  
  // Same brand
  if (product1.brand === product2.brand) {
    score += 20;
  }
  
  // Common tags
  const commonTags = product1.tags.filter(tag => product2.tags.includes(tag));
  score += Math.min(commonTags.length * 5, 20);
  
  return score;
};

// Get similar products based on content
export const getSimilarProducts = (
  product: Product,
  allProducts: Product[],
  limit: number = 6
): Product[] => {
  const scoredProducts = allProducts
    .filter(p => p.id !== product.id && p.inStock)
    .map(p => ({
      product: p,
      score: calculateSimilarity(product, p)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  return scoredProducts.map(sp => sp.product);
};

// Get recommendations based on user activity
export const getPersonalizedRecommendations = (
  userId: string,
  allProducts: Product[],
  limit: number = 10
): Product[] => {
  const activity = getUserActivity(userId);
  const scoredProducts: { product: Product; score: number }[] = [];
  
  allProducts.forEach(product => {
    if (!product.inStock) return;
    
    let score = 0;
    
    // Recently viewed products get lower priority (already seen)
    if (activity.viewedProducts.includes(product.id)) {
      score -= 50;
    }
    
    // Category preference
    const categoryScore = activity.categoryPreferences[product.category] || 0;
    score += categoryScore * 10;
    
    // Similar to viewed products
    const viewedProductObjects = allProducts.filter(p => 
      activity.viewedProducts.slice(0, 5).includes(p.id)
    );
    viewedProductObjects.forEach(viewedProduct => {
      score += calculateSimilarity(product, viewedProduct) * 0.5;
    });
    
    // Popularity boost
    const viewCount = getProductViewCount(product.id);
    score += Math.log(viewCount + 1) * 5;
    
    // Rating boost
    score += product.rating * 3;
    
    scoredProducts.push({ product, score });
  });
  
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(sp => sp.product);
};

// Get popular products
export const getPopularProducts = (
  allProducts: Product[],
  limit: number = 10
): Product[] => {
  return allProducts
    .filter(p => p.inStock)
    .map(p => ({
      product: p,
      score: getProductViewCount(p.id) * 10 + p.rating * p.reviewCount
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(sp => sp.product);
};

// Get category-based recommendations
export const getCategoryRecommendations = (
  category: string,
  allProducts: Product[],
  limit: number = 10
): Product[] => {
  return allProducts
    .filter(p => p.category === category && p.inStock)
    .sort((a, b) => {
      const scoreA = getProductViewCount(a.id) + a.rating * 100;
      const scoreB = getProductViewCount(b.id) + b.rating * 100;
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

// Get trending products (high recent view count)
export const getTrendingProducts = (
  allProducts: Product[],
  limit: number = 8
): Product[] => {
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  
  return allProducts
    .filter(p => p.inStock)
    .map(p => ({
      product: p,
      score: getProductViewCount(p.id) * (p.rating / 5) * 10
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(sp => sp.product);
};

// Get recommendation rules from localStorage
export const getRecommendationRules = (): RecommendationRule[] => {
  const stored = localStorage.getItem('recommendation_rules');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default rules
  const defaultRules: RecommendationRule[] = [
    { id: '1', name: 'Category-based', type: 'category', weight: 30, enabled: true },
    { id: '2', name: 'Similar Products', type: 'similarity', weight: 40, enabled: true },
    { id: '3', name: 'Popular Products', type: 'popularity', weight: 20, enabled: true },
    { id: '4', name: 'Collaborative Filtering', type: 'collaborative', weight: 10, enabled: true }
  ];
  
  localStorage.setItem('recommendation_rules', JSON.stringify(defaultRules));
  return defaultRules;
};

// Save recommendation rules
export const saveRecommendationRules = (rules: RecommendationRule[]): void => {
  localStorage.setItem('recommendation_rules', JSON.stringify(rules));
};

// Get current user ID (or generate guest ID)
export const getCurrentUserId = (): string => {
  let userId = localStorage.getItem('current_user_id');
  if (!userId) {
    userId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('current_user_id', userId);
  }
  return userId;
};

// Initialize view counts for products
export const initializeProductViewCounts = (products: Product[]): void => {
  const existing = localStorage.getItem('product_view_counts');
  if (!existing) {
    const viewCounts: Record<string, number> = {};
    products.forEach(product => {
      viewCounts[product.id] = product.viewCount;
    });
    localStorage.setItem('product_view_counts', JSON.stringify(viewCounts));
  }
};
