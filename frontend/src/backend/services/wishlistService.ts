import { supabase } from "@/integrations/supabase/client";

export async function fetchWishlist(userId: string) {
  const { data, error } = await (supabase as any)
    .from("wishlists")
    .select("product_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((w: any) => w.product_id as string);
}

export async function addToWishlist(userId: string, productId: string) {
  const { error } = await (supabase as any)
    .from("wishlists")
    .insert({ user_id: userId, product_id: productId });
  if (error && error.code !== "23505") throw error;
}

export async function removeFromWishlist(userId: string, productId: string) {
  const { error } = await (supabase as any)
    .from("wishlists")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  if (error) throw error;
}
