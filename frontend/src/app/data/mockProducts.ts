export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  viewCount: number;
  inStock: boolean;
  brand: string;
}

export const mockProducts: Product[] = [
  // Electronics - Laptops
  {
    id: "1",
    name: "Dell XPS 15 Laptop",
    category: "Electronics",
    price: 89999,
    originalPrice: 99999,
    image: "https://images.unsplash.com/photo-1642943038577-eb4a59549766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwNzQwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "15.6-inch FHD display, Intel i7 processor, 16GB RAM, 512GB SSD",
    tags: ["laptop", "dell", "premium", "work", "gaming"],
    rating: 4.5,
    reviewCount: 1250,
    viewCount: 5420,
    inStock: true,
    brand: "Dell"
  },
  {
    id: "2",
    name: "MacBook Pro 14-inch",
    category: "Electronics",
    price: 189999,
    originalPrice: 199999,
    image: "https://images.unsplash.com/photo-1642943038577-eb4a59549766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwNzQwMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Apple M3 Pro chip, 18GB RAM, 512GB SSD, Liquid Retina XDR display",
    tags: ["laptop", "apple", "premium", "creative", "professional"],
    rating: 4.8,
    reviewCount: 2100,
    viewCount: 8950,
    inStock: true,
    brand: "Apple"
  },
  // Electronics - Smartphones
  {
    id: "3",
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    price: 124999,
    originalPrice: 134999,
    image: "https://images.unsplash.com/photo-1741061963623-24ad9b3c0f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzcwNzcxMzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "6.8-inch Dynamic AMOLED display, 12GB RAM, 256GB storage, 200MP camera",
    tags: ["smartphone", "samsung", "flagship", "camera", "5g"],
    rating: 4.6,
    reviewCount: 3450,
    viewCount: 12340,
    inStock: true,
    brand: "Samsung"
  },
  {
    id: "4",
    name: "iPhone 15 Pro Max",
    category: "Electronics",
    price: 159999,
    image: "https://images.unsplash.com/photo-1741061963623-24ad9b3c0f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzcwNzcxMzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A17 Pro chip, 6.7-inch Super Retina XDR display, Titanium design",
    tags: ["smartphone", "apple", "flagship", "premium", "5g"],
    rating: 4.7,
    reviewCount: 5200,
    viewCount: 15670,
    inStock: true,
    brand: "Apple"
  },
  // Electronics - Audio
  {
    id: "5",
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    price: 29999,
    originalPrice: 34999,
    image: "https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzcwNzQ2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Industry-leading noise cancellation, 30-hour battery life, premium sound",
    tags: ["headphones", "sony", "wireless", "noise-cancelling", "premium"],
    rating: 4.8,
    reviewCount: 4320,
    viewCount: 9870,
    inStock: true,
    brand: "Sony"
  },
  {
    id: "6",
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Electronics",
    price: 24999,
    image: "https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzcwNzQ2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Active Noise Cancellation, Personalized Spatial Audio, MagSafe charging",
    tags: ["earbuds", "apple", "wireless", "noise-cancelling", "premium"],
    rating: 4.7,
    reviewCount: 6780,
    viewCount: 14230,
    inStock: true,
    brand: "Apple"
  },
  // Electronics - Cameras
  {
    id: "7",
    name: "Canon EOS R6 Mark II",
    category: "Electronics",
    price: 249999,
    image: "https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzA3NjI5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "24.2MP Full-Frame CMOS sensor, 4K 60p video, In-body image stabilization",
    tags: ["camera", "canon", "professional", "photography", "mirrorless"],
    rating: 4.9,
    reviewCount: 890,
    viewCount: 3450,
    inStock: true,
    brand: "Canon"
  },
  {
    id: "8",
    name: "Nikon Z8 Mirrorless",
    category: "Electronics",
    price: 339999,
    image: "https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzA3NjI5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "45.7MP Stacked CMOS sensor, 8K video, Advanced autofocus system",
    tags: ["camera", "nikon", "professional", "photography", "mirrorless"],
    rating: 4.8,
    reviewCount: 620,
    viewCount: 2890,
    inStock: true,
    brand: "Nikon"
  },
  // Electronics - Wearables
  {
    id: "9",
    name: "Apple Watch Series 9",
    category: "Electronics",
    price: 44999,
    originalPrice: 49999,
    image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzcwNzM3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "S9 chip, Always-On Retina display, Advanced health monitoring, WatchOS 10",
    tags: ["smartwatch", "apple", "fitness", "health", "wearable"],
    rating: 4.6,
    reviewCount: 8900,
    viewCount: 18450,
    inStock: true,
    brand: "Apple"
  },
  {
    id: "10",
    name: "Samsung Galaxy Watch 6",
    category: "Electronics",
    price: 29999,
    image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzcwNzM3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Larger AMOLED display, Advanced sleep coaching, Wear OS 4",
    tags: ["smartwatch", "samsung", "fitness", "health", "wearable"],
    rating: 4.5,
    reviewCount: 5670,
    viewCount: 11230,
    inStock: true,
    brand: "Samsung"
  },
  // Electronics - TV
  {
    id: "11",
    name: "LG C3 OLED 65-inch TV",
    category: "Electronics",
    price: 189999,
    originalPrice: 219999,
    image: "https://images.unsplash.com/photo-1645736563824-c30a3c341fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwc2NyZWVuJTIwZGlzcGxheXxlbnwxfHx8fDE3NzA3NDExMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "4K OLED evo display, α9 AI Processor Gen6, Dolby Vision IQ, 120Hz",
    tags: ["tv", "lg", "oled", "4k", "smart-tv", "gaming"],
    rating: 4.8,
    reviewCount: 3200,
    viewCount: 7650,
    inStock: true,
    brand: "LG"
  },
  {
    id: "12",
    name: "Samsung Neo QLED 55-inch",
    category: "Electronics",
    price: 124999,
    image: "https://images.unsplash.com/photo-1645736563824-c30a3c341fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwc2NyZWVuJTIwZGlzcGxheXxlbnwxfHx8fDE3NzA3NDExMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Quantum Mini LED, Neural Quantum Processor 4K, Object Tracking Sound+",
    tags: ["tv", "samsung", "qled", "4k", "smart-tv"],
    rating: 4.6,
    reviewCount: 2890,
    viewCount: 6340,
    inStock: true,
    brand: "Samsung"
  },
  // Electronics - Tablets
  {
    id: "13",
    name: "iPad Pro 12.9-inch (M2)",
    category: "Electronics",
    price: 109999,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBpcGFkfGVufDF8fHx8MTc3MDcyOTUyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "M2 chip, Liquid Retina XDR display, Apple Pencil support, iPadOS 17",
    tags: ["tablet", "apple", "ipad", "creative", "productivity"],
    rating: 4.8,
    reviewCount: 4560,
    viewCount: 9870,
    inStock: true,
    brand: "Apple"
  },
  {
    id: "14",
    name: "Samsung Galaxy Tab S9",
    category: "Electronics",
    price: 74999,
    originalPrice: 84999,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBpcGFkfGVufDF8fHx8MTc3MDcyOTUyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "11-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, S Pen included",
    tags: ["tablet", "samsung", "android", "productivity"],
    rating: 4.5,
    reviewCount: 3210,
    viewCount: 7120,
    inStock: true,
    brand: "Samsung"
  },
  // Electronics - Gaming
  {
    id: "15",
    name: "PlayStation 5 Console",
    category: "Electronics",
    price: 54999,
    image: "https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NzA3NTQ5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Custom SSD, Ray tracing, 4K gaming at 120Hz, DualSense controller",
    tags: ["gaming", "playstation", "console", "entertainment"],
    rating: 4.9,
    reviewCount: 12340,
    viewCount: 25670,
    inStock: false,
    brand: "Sony"
  },
  {
    id: "16",
    name: "Xbox Series X",
    category: "Electronics",
    price: 52999,
    image: "https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NzA3NTQ5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "12 teraflops GPU, 4K gaming, Quick Resume, Xbox Game Pass",
    tags: ["gaming", "xbox", "console", "entertainment"],
    rating: 4.7,
    reviewCount: 9870,
    viewCount: 19450,
    inStock: true,
    brand: "Microsoft"
  },
  // Fashion - Footwear
  {
    id: "17",
    name: "Nike Air Max 270",
    category: "Fashion",
    price: 12999,
    originalPrice: 14999,
    image: "https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzA4MjA5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Max Air cushioning, breathable mesh upper, lifestyle sneakers",
    tags: ["shoes", "nike", "sneakers", "sports", "casual"],
    rating: 4.6,
    reviewCount: 5670,
    viewCount: 14320,
    inStock: true,
    brand: "Nike"
  },
  {
    id: "18",
    name: "Adidas Ultraboost 22",
    category: "Fashion",
    price: 15999,
    image: "https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzA4MjA5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Boost cushioning, Primeknit+ upper, carbon-neutral production",
    tags: ["shoes", "adidas", "running", "sports", "eco-friendly"],
    rating: 4.7,
    reviewCount: 4320,
    viewCount: 11230,
    inStock: true,
    brand: "Adidas"
  },
  // Fashion - Apparel
  {
    id: "19",
    name: "Levi's 501 Original Fit Jeans",
    category: "Fashion",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1679212622264-646085f5653f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBjbG90aGluZyUyMGFwcGFyZWx8ZW58MXx8fHwxNzcwODIwOTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Classic straight fit, button fly, 100% cotton denim",
    tags: ["jeans", "levis", "denim", "casual", "classic"],
    rating: 4.5,
    reviewCount: 8900,
    viewCount: 16780,
    inStock: true,
    brand: "Levi's"
  },
  {
    id: "20",
    name: "H&M Cotton T-Shirt Pack",
    category: "Fashion",
    price: 1499,
    image: "https://images.unsplash.com/photo-1679212622264-646085f5653f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBjbG90aGluZyUyMGFwcGFyZWx8ZW58MXx8fHwxNzcwODIwOTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Pack of 3, 100% organic cotton, regular fit, assorted colors",
    tags: ["tshirt", "hm", "casual", "basics", "cotton"],
    rating: 4.3,
    reviewCount: 12340,
    viewCount: 24560,
    inStock: true,
    brand: "H&M"
  },
  // Books
  {
    id: "21",
    name: "Atomic Habits by James Clear",
    category: "Books",
    price: 599,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1660092506466-6e433fb9cdbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMGxpdGVyYXR1cmV8ZW58MXx8fHwxNzcwNzI5OTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "An easy & proven way to build good habits & break bad ones",
    tags: ["book", "self-help", "productivity", "bestseller"],
    rating: 4.8,
    reviewCount: 15670,
    viewCount: 32100,
    inStock: true,
    brand: "Penguin Random House"
  },
  {
    id: "22",
    name: "The Psychology of Money",
    category: "Books",
    price: 499,
    image: "https://images.unsplash.com/photo-1660092506466-6e433fb9cdbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMGxpdGVyYXR1cmV8ZW58MXx8fHwxNzcwNzI5OTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel",
    tags: ["book", "finance", "investing", "bestseller"],
    rating: 4.7,
    reviewCount: 9870,
    viewCount: 21340,
    inStock: true,
    brand: "Harriman House"
  },
  // Accessories
  {
    id: "23",
    name: "The North Face Recon Backpack",
    category: "Accessories",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1769804684256-68318ae898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZyUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3MDgwMDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "30L capacity, laptop compartment, FlexVent suspension system",
    tags: ["backpack", "northface", "travel", "school", "durable"],
    rating: 4.7,
    reviewCount: 6780,
    viewCount: 13450,
    inStock: true,
    brand: "The North Face"
  },
  {
    id: "24",
    name: "SwissGear Travel Backpack",
    category: "Accessories",
    price: 5999,
    image: "https://images.unsplash.com/photo-1769804684256-68318ae898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZyUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3MDgwMDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "TSA-friendly laptop compartment, weather-resistant fabric, ergonomic",
    tags: ["backpack", "swissgear", "travel", "business", "laptop"],
    rating: 4.5,
    reviewCount: 5430,
    viewCount: 10890,
    inStock: true,
    brand: "SwissGear"
  }
];

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Books",
  "Accessories"
];
