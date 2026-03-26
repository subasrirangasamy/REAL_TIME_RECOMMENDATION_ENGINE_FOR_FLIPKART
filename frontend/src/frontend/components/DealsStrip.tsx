import { Link } from "react-router-dom";
import { Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { useDealsOfTheDay } from "@/hooks/useProducts";

const DealsStrip = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 30 });
  const { data: dealsProducts = [] } = useDealsOfTheDay();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const topDeals = dealsProducts.slice(0, 6);

  return (
    <section className="bg-card rounded shadow-sm p-4 md:p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Deals of the Day</h2>
          <div className="flex items-center gap-1.5 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-bold">
            <Timer className="w-4 h-4" />
            {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </div>
        </div>
        <Link
          to="/products"
          className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded hover:opacity-90 transition-opacity"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {topDeals.map((product) => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted/30 mb-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-bold text-green-600">Up to {discount}% Off</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{product.category}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DealsStrip;
