import { supabase } from "@/integrations/supabase/client";

export interface DbProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  original_price: number;
  rating: number;
  review_count: number;
  description: string | null;
  image: string | null;
  tags: string[] | null;
  brand: string | null;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

// Map DB product to app Product format
export function mapProduct(p: DbProduct) {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    originalPrice: p.original_price,
    rating: p.rating,
    reviewCount: p.review_count,
    description: p.description || "",
    image: p.image || "",
    tags: p.tags || [],
    brand: p.brand || "",
    inStock: p.in_stock,
  };
}

export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
}

export async function fetchProductById(id: string) {
  // Validate UUID format to prevent 400 errors
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return mapProduct(data as DbProduct);
}

export async function fetchProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
}

export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`title.ilike.%${query}%,brand.ilike.%${query}%,category.ilike.%${query}%`);
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
}

export async function fetchTrending() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("review_count", { ascending: false })
    .limit(10);
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
}

export async function fetchDealsOfTheDay() {
  const { data, error } = await supabase
    .from("products")
    .select("*");
  if (error) throw error;
  return (data as DbProduct[])
    .map(mapProduct)
    .filter((p) => ((p.originalPrice - p.price) / p.originalPrice) * 100 >= 20)
    .sort((a, b) => ((b.originalPrice - b.price) / b.originalPrice) - ((a.originalPrice - a.price) / a.originalPrice))
    .slice(0, 8);
}

export async function fetchTopRated() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("rating", { ascending: false })
    .limit(8);
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
}

export async function fetchBudgetPicks() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .lt("price", 15000)
    .order("review_count", { ascending: false })
    .limit(8);
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
}

export async function fetchCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("products")
    .select("category");
  if (error) throw error;
  return [...new Set((data as { category: string }[]).map((d) => d.category))];
}
