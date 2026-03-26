import { categories } from "@/data/products";
import { Link } from "react-router-dom";
import { Smartphone, Laptop, Headphones, Shirt, Footprints, Tv, Tablet, Blend } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  Mobiles: <Smartphone className="w-7 h-7" />,
  Laptops: <Laptop className="w-7 h-7" />,
  Electronics: <Headphones className="w-7 h-7" />,
  Fashion: <Shirt className="w-7 h-7" />,
  Footwear: <Footprints className="w-7 h-7" />,
  TVs: <Tv className="w-7 h-7" />,
  Tablets: <Tablet className="w-7 h-7" />,
  Appliances: <Blend className="w-7 h-7" />,
};

const subtitles: Record<string, string> = {
  Mobiles: "From ₹9,999",
  Laptops: "From ₹29,990",
  Electronics: "Up to 70% Off",
  Fashion: "50-80% Off",
  Footwear: "Min. 40% Off",
  TVs: "From ₹12,999",
  Tablets: "From ₹14,999",
  Appliances: "Up to 55% Off",
};

const CategoryBar = () => {
  return (
    <section className="bg-card rounded shadow-sm py-5 px-4">
      <div className="flex items-start justify-around gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/products?category=${encodeURIComponent(cat)}`}
            className="flex flex-col items-center gap-2 min-w-[80px] group"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
              {icons[cat]}
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-foreground block">{cat}</span>
              <span className="text-[10px] text-success font-medium">{subtitles[cat]}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryBar;
