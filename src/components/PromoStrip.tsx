import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Clock, Gift, Truck, Percent } from 'lucide-react';

const promos = [
  { icon: Percent, text: "MEGA SALE: Up to 50% OFF", link: "/sale", color: "text-accent" },
  { icon: Gift, text: "Use code WELCOME15 for 15% off first order", link: "/shop", color: "text-primary-foreground" },
  { icon: Truck, text: "FREE Shipping on orders above ₹999", link: "/shop", color: "text-primary-foreground" },
  { icon: Sparkles, text: "New Arrivals: Festival Collection", link: "/shop?filter=new", color: "text-accent" },
];

const PromoStrip = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const promo = promos[currentPromo];
  const Icon = promo.icon;

  return (
    <div className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" />
      
      <div className="container mx-auto px-4 py-2 relative">
        <div className="flex items-center justify-center gap-2 animate-fade-in" key={currentPromo}>
          <Icon className={`h-4 w-4 ${promo.color} animate-pulse`} />
          <Link 
            to={promo.link} 
            className="text-sm font-medium hover:underline"
          >
            {promo.text}
          </Link>
          <Icon className={`h-4 w-4 ${promo.color} animate-pulse`} />
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1 pb-1">
        {promos.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === currentPromo ? 'bg-accent' : 'bg-primary-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoStrip;
