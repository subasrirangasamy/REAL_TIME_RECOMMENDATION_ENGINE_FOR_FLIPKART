export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  tags: string[];
  brand: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserInteraction {
  productId: string;
  type: 'view' | 'cart' | 'purchase' | 'search';
  timestamp: number;
}
