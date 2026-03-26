import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Header from "@/components/Header";
import { toast } from "sonner";

const LoginPage = () => {
  const { loginWithEmail, registerWithEmail } = useApp();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await registerWithEmail(email, password, name || email.split("@")[0]);
        toast.success("Account created! Please check your email to verify your account.");
      } else {
        await loginWithEmail(email, password);
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-6">
            <h2 className="text-2xl font-bold text-primary-foreground">
              {isRegister ? "Sign Up" : "Login"}
            </h2>
            <p className="text-primary-foreground/70 text-sm mt-1">
              {isRegister
                ? "Create your account to get started"
                : "Get access to your Orders, Wishlist and Recommendations"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border rounded px-3 py-2.5 text-sm bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="Enter your password"
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded text-sm hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? "Please wait..." : isRegister ? "SIGN UP" : "LOGIN"}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              {isRegister ? "Already have an account?" : "New to Flipkart?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary font-medium hover:underline"
              >
                {isRegister ? "Login" : "Create an account"}
              </button>
            </p>
          </form>
          <div className="px-6 pb-6">
            <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
