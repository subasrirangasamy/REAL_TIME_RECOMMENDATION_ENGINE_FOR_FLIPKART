import { supabase } from "@/integrations/supabase/client";

export async function placeOrder(userId: string, items: any[], total: number) {
  const { data, error } = await supabase
    .from("orders")
    .insert({ user_id: userId, items: JSON.stringify(items), total } as any)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
