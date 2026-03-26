import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/services/wishlistService";
import { useApp } from "@/context/AppContext";

export function useWishlist() {
  const { userId } = useApp();
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => fetchWishlist(userId!),
    enabled: !!userId,
  });
}

export function useToggleWishlist() {
  const { userId } = useApp();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: (productId: string) => addToWishlist(userId!, productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const remove = useMutation({
    mutationFn: (productId: string) => removeFromWishlist(userId!, productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  return { add, remove };
}
