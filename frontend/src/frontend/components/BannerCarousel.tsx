import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Zap, Shield, Truck, RotateCcw } from "lucide-react";

const banners = [
  {
    title: "Big Savings Days",
    subtitle: "Up to 80% Off",
    description: "Best deals on electronics, fashion, home & more. Shop now!",
    gradient: "from-primary to-blue-700",
  },
  {
    title: "Smartphone Mega Sale",
    subtitle: "From ₹9,999",
    description: "Top brands like Samsung, Apple, OnePlus & more at unbeatable prices.",
    gradient: "from-emerald-600 to-teal-800",
  },
  {
    title: "Fashion Fiesta",
    subtitle: "50-80% Off",
    description: "Trending styles for men & women. Premium brands at best prices.",
    gradient: "from-purple-600 to-indigo-800",
  },
  {
    title: "Electronics Super Sale",
    subtitle: "Up to 70% Off",
    description: "Laptops, headphones, smartwatches & more at lowest prices ever.",
    gradient: "from-orange-500 to-red-700",
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = banners[current];

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className={`bg-gradient-to-r ${banner.gradient} p-6 md:p-10 text-white transition-all duration-500`}
      >
        <div className="max-w-2xl">
          <span className="text-deal font-bold text-sm uppercase tracking-wider animate-pulse">
            {banner.title}
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-2 leading-tight animate-fade-up">
            {banner.subtitle}
          </h1>
          <p className="text-white/80 mt-2 text-sm md:text-base">
            {banner.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Zap, text: "Flash Sales" },
              { icon: Truck, text: "Free Delivery" },
              { icon: Shield, text: "Secure Payment" },
              { icon: RotateCcw, text: "Easy Returns" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs bg-white/10 rounded-full px-3 py-1.5">
                <Icon className="w-3.5 h-3.5 text-deal" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground rounded-full p-1.5 shadow-lg transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground rounded-full p-1.5 shadow-lg transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
