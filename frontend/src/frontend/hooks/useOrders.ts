import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/services/orderService";
import { useApp } from "@/context/AppContext";

export function useOrders() {
  const { userId } = useApp();
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchOrders(userId!),
    enabled: !!userId,
  });
}
