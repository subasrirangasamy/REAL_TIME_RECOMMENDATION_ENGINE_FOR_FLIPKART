import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { placeOrder } from "@/services/orderService";
import { toast } from "sonner";
import { MapPin, CreditCard, Truck } from "lucide-react";

const CheckoutPage = () => {
  const { cart, cartTotal, isLoggedIn, userId } = useApp();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [address, setAddress] = useState({ name: "", phone: "", pincode: "", locality: "", address: "", city: "", state: "" });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <p className="text-muted-foreground text-lg">Please login to checkout</p>
          <Link to="/login" className="inline-block mt-4 bg-primary text-primary-foreground font-medium px-8 py-2.5 rounded">Login</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <p className="text-muted-foreground text-lg">Your cart is empty</p>
          <Link to="/" className="inline-block mt-4 bg-primary text-primary-foreground font-medium px-8 py-2.5 rounded">Shop Now</Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address.name || !address.phone || !address.pincode || !address.address || !address.city || !address.state) {
      toast.error("Please fill all address fields");
      return;
    }
    setPlacing(true);
    try {
      const items = cart.map((i) => ({
        productId: i.product.id,
        title: i.product.title,
        image: i.product.image,
        price: i.product.price,
        quantity: i.quantity,
      }));
      await placeOrder(userId!, items, cartTotal);
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  const discount = cart.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-4 px-2 md:px-4">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* Address */}
            <div className="bg-card rounded shadow-sm p-4">
              <h2 className="text-base font-bold text-primary flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" /> Delivery Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input placeholder="Full Name *" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className="border border-border rounded px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary" />
                <input placeholder="Phone Number *" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="border border-border rounded px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary" />
                <input placeholder="Pincode *" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="border border-border rounded px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary" />
                <input placeholder="Locality" value={address.locality} onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                  className="border border-border rounded px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary" />
                <textarea placeholder="Address *" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="border border-border rounded px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary sm:col-span-2" rows={2} />
                <input placeholder="City *" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="border border-border rounded px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary" />
                <input placeholder="State *" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="border border-border rounded px-3 py-2.5 text-sm bg-card text-foreground outline-none focus:border-primary" />
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-card rounded shadow-sm p-4">
              <h2 className="text-base font-bold text-primary flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5" /> Order Summary
              </h2>
              <div className="space-y-3">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 items-center">
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-1">{product.title}</p>
                      <p className="text-xs text-muted-foreground">{product.brand} × {quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-foreground">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded shadow-sm p-4">
              <h2 className="text-base font-bold text-primary flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5" /> Payment
              </h2>
              <div className="space-y-2">
                {["Cash on Delivery", "UPI / Net Banking", "Credit / Debit Card"].map((method) => (
                  <label key={method} className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="radio" name="payment" defaultChecked={method === "Cash on Delivery"} className="accent-primary" />
                    <span className="text-sm text-foreground">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Price details */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded shadow-sm p-4 sticky top-28">
              <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">Price Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground">Price ({cart.length} items)</span>
                  <span className="text-foreground">₹{cart.reduce((s, i) => s + i.product.originalPrice * i.quantity, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Discount</span>
                  <span className="text-success">-₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Delivery</span>
                  <span className="text-success">Free</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full bg-deal text-deal-foreground font-bold py-3 rounded mt-4 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {placing ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                You save ₹{discount.toLocaleString()} on this order
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
