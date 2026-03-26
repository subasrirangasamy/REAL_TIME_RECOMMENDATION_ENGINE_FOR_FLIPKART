import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { useOrders } from "@/hooks/useOrders";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Package, Heart, MapPin, Edit2, Save, LogOut, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { isLoggedIn, userName, userId, logout, authLoading } = useApp();
  const { data: orders = [] } = useOrders();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single()
      .then(({ data }) => {
        if (data) {
          setDisplayName(data.display_name || "");
          setEmail(data.email || "");
          setAvatarUrl(data.avatar_url || "");
          setProfileLoaded(true);
        }
      });
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, avatar_url: avatarUrl })
      .eq("user_id", userId);
    setSaving(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
      setEditing(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-12 text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-12 text-center">
          <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Please log in</h2>
          <Link to="/login" className="text-primary font-medium hover:underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((s, o) => s + Number(o.total), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-2 md:px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary" />
                )}
              </div>

              {editing ? (
                <div className="space-y-3 text-left">
                  <div>
                    <label className="text-xs text-muted-foreground">Display Name</label>
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Avatar URL</label>
                    <input
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-primary text-primary-foreground py-2 rounded font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                  >
                    <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="w-full text-muted-foreground text-sm py-1 hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-foreground">{displayName || userName}</h2>
                  <p className="text-sm text-muted-foreground">{email}</p>
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-3 text-primary text-sm font-medium flex items-center gap-1 mx-auto hover:underline"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                  </button>
                </>
              )}

              <hr className="my-4 border-border" />

              <nav className="space-y-1 text-left">
                <Link to="/orders" className="flex items-center gap-2 text-sm py-2 px-3 rounded hover:bg-muted transition-colors text-foreground">
                  <Package className="w-4 h-4 text-primary" /> My Orders
                </Link>
                <Link to="/wishlist" className="flex items-center gap-2 text-sm py-2 px-3 rounded hover:bg-muted transition-colors text-foreground">
                  <Heart className="w-4 h-4 text-destructive" /> Wishlist
                </Link>
                <Link to="/cart" className="flex items-center gap-2 text-sm py-2 px-3 rounded hover:bg-muted transition-colors text-foreground">
                  <ShoppingCart className="w-4 h-4 text-deal" /> Cart
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm py-2 px-3 rounded hover:bg-destructive/10 transition-colors text-destructive w-full text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Right column: Stats + Recent Orders */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-lg shadow-sm border border-border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{orders.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Orders</p>
              </div>
              <div className="bg-card rounded-lg shadow-sm border border-border p-4 text-center">
                <p className="text-2xl font-bold text-success">₹{totalSpent.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Spent</p>
              </div>
              <div className="bg-card rounded-lg shadow-sm border border-border p-4 text-center">
                <p className="text-2xl font-bold text-deal">{profileLoaded ? "Active" : "..."}</p>
                <p className="text-xs text-muted-foreground mt-1">Status</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Recent Orders</h3>
                <Link to="/orders" className="text-primary text-sm hover:underline">View All</Link>
              </div>
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No orders yet. Start shopping!</p>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => {
                    const items = Array.isArray(order.items) ? order.items : [];
                    return (
                      <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {items.length} item{items.length !== 1 ? "s" : ""}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">₹{Number(order.total).toLocaleString()}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            order.status === "pending"
                              ? "bg-deal/10 text-deal"
                              : order.status === "delivered"
                              ? "bg-success/10 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
