import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Gift, Truck, Percent } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Promotion {
  id: string;
  icon: string;
  text: string;
  link: string;
  color: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  percent: Percent,
  gift: Gift,
  truck: Truck,
  sparkles: Sparkles,
};

const PromoStrip = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setPromotions(data);
      } else {
        // Fallback to default promotions if none found
        setPromotions([
          { id: '1', icon: 'percent', text: 'MEGA SALE: Up to 50% OFF', link: '/sale', color: 'text-accent' },
          { id: '2', icon: 'gift', text: 'Use code WELCOME15 for 15% off first order', link: '/shop', color: 'text-primary-foreground' },
          { id: '3', icon: 'truck', text: 'FREE Shipping on orders above ₹999', link: '/shop', color: 'text-primary-foreground' },
          { id: '4', icon: 'sparkles', text: 'New Arrivals: Festival Collection', link: '/shop?filter=new', color: 'text-accent' },
        ]);
      }
      setLoading(false);
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [promotions.length]);

  if (!isVisible || loading || promotions.length === 0) return null;

  const promo = promotions[currentPromo];
  const Icon = iconMap[promo.icon] || Sparkles;

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
        {promotions.map((_, i) => (
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
