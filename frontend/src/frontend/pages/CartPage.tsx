import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground mt-1">Add items to get started</p>
          <Link
            to="/"
            className="inline-block mt-6 bg-primary text-primary-foreground font-medium px-8 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-4 px-2 md:px-4">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-2">
            <div className="bg-card rounded shadow-sm p-4">
              <h2 className="text-lg font-bold text-foreground">My Cart ({cart.length})</h2>
            </div>
            {cart.map(({ product, quantity }) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              return (
                <div key={product.id} className="bg-card rounded shadow-sm p-4 flex gap-4 animate-fade-up">
                  <Link to={`/product/${product.id}`} className="flex-shrink-0">
                    <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-medium text-foreground line-clamp-2">{product.title}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-xs font-medium text-success">{discount}% off</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-border rounded">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-2 py-1 hover:bg-muted transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium border-x border-border">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-2 py-1 hover:bg-muted transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  <span className="text-success">-₹{(cart.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity, 0)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Delivery Charges</span>
                  <span className="text-success">Free</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" className="block w-full bg-deal text-deal-foreground font-bold py-3 rounded mt-4 hover:opacity-90 transition-opacity text-center">
                PLACE ORDER
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
