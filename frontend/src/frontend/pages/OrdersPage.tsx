import Header from "@/components/Header";
import { useOrders } from "@/hooks/useOrders";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { Package, Clock, CheckCircle, Truck as TruckIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-deal", label: "Order Placed" },
  processing: { icon: Package, color: "text-primary", label: "Processing" },
  shipped: { icon: TruckIcon, color: "text-primary", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-success", label: "Delivered" },
};

const OrdersPage = () => {
  const { isLoggedIn } = useApp();
  const { data: orders = [], isLoading } = useOrders();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <p className="text-muted-foreground text-lg">Please login to view your orders</p>
          <Link to="/login" className="inline-block mt-4 bg-primary text-primary-foreground font-medium px-8 py-2.5 rounded">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-4 px-2 md:px-4">
        <div className="bg-card rounded shadow-sm p-4 mb-4">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" /> My Orders
          </h1>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-card rounded shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No orders yet</p>
            <Link to="/products" className="inline-block mt-4 text-primary font-medium hover:underline">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order: any) => {
              const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items;
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <div key={order.id} className="bg-card rounded shadow-sm p-4 animate-fade-up">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(Array.isArray(items) ? items : []).map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground line-clamp-1">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <hr className="border-border my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-base font-bold text-foreground">₹{Number(order.total).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
