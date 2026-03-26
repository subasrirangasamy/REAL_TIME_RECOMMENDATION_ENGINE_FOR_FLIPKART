import { Link } from "react-router-dom";

const footerLinks = {
  About: ["Contact Us", "About Us", "Careers", "Press", "Corporate Information"],
  Help: ["Payments", "Shipping", "Cancellation & Returns", "FAQ", "Report Infringement"],
  Policy: ["Return Policy", "Terms Of Use", "Security", "Privacy", "Sitemap"],
  Social: ["Facebook", "Twitter", "YouTube", "Instagram"],
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-8">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold text-primary-foreground/50 uppercase tracking-wider mb-3">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-xs text-primary-foreground/70 hover:text-primary-foreground cursor-pointer transition-colors">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-primary-foreground/50">
            <span>Become a Seller</span>
            <span>Advertise</span>
            <span>Gift Cards</span>
            <span>Help Center</span>
          </div>
          <p className="text-xs text-primary-foreground/40">
            © 2026 Flipkart Clone. Built with React & Tailwind CSS
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-8 text-primary-foreground/50">
          <div className="flex items-center gap-2">
            <span className="text-deal text-lg">🏪</span>
            <div>
              <p className="text-[10px] font-bold text-primary-foreground/60">Seller</p>
              <p className="text-xs">Become a Seller</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-deal text-lg">⭐</span>
            <div>
              <p className="text-[10px] font-bold text-primary-foreground/60">Advertise</p>
              <p className="text-xs">Promote Products</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-deal text-lg">🎁</span>
            <div>
              <p className="text-[10px] font-bold text-primary-foreground/60">Gift Cards</p>
              <p className="text-xs">Send Gifts</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
