import { supabase } from "@/integrations/supabase/client";

export async function trackInteraction(
  userId: string,
  productId: string,
  type: "view" | "cart" | "purchase" | "search" | "wishlist"
) {
  const { error } = await supabase.from("user_interactions").insert({
    user_id: userId,
    product_id: productId,
    interaction_type: type,
  } as any);
  if (error) console.error("Track interaction error:", error);
}

export async function getUserInteractions(userId: string) {
  const { data, error } = await supabase
    .from("user_interactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function placeOrder(userId: string, items: any[], total: number) {
  const { data, error } = await supabase.from("orders").insert({
    user_id: userId,
    items: JSON.stringify(items),
    total,
  } as any);
  if (error) throw error;
  return data;
}
