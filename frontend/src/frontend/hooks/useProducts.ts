import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchProductById,
  fetchTrending,
  fetchDealsOfTheDay,
  fetchTopRated,
  fetchBudgetPicks,
  fetchCategories,
  searchProducts,
} from "@/services/productService";

export function useAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

export function useTrending() {
  return useQuery({
    queryKey: ["products", "trending"],
    queryFn: fetchTrending,
  });
}

export function useDealsOfTheDay() {
  return useQuery({
    queryKey: ["products", "deals"],
    queryFn: fetchDealsOfTheDay,
  });
}

export function useTopRated() {
  return useQuery({
    queryKey: ["products", "topRated"],
    queryFn: fetchTopRated,
  });
}

export function useBudgetPicks() {
  return useQuery({
    queryKey: ["products", "budget"],
    queryFn: fetchBudgetPicks,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  });
}
