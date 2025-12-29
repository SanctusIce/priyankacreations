import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Promotion {
  id: string;
  text: string;
  link: string;
  color: string;
  icon: string;
  is_active: boolean;
  sort_order: number;
}

const defaultPromotions: Promotion[] = [
  {
    id: "default-1",
    text: "Free shipping on orders above ₹999",
    link: "/shipping",
    color: "#000000",
    icon: "truck",
    is_active: true,
    sort_order: 0,
  },
  {
    id: "default-2",
    text: "Use code FIRST15 for 15% off your first order",
    link: "/shop",
    color: "#000000",
    icon: "tag",
    is_active: true,
    sort_order: 1,
  },
];

const PromoStrip = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [promotions, setPromotions] = useState<Promotion[]>(defaultPromotions);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPromotions = async () => {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        setPromotions(data);
      }
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [promotions.length]);

  if (!isVisible) return null;

  const currentPromo = promotions[currentIndex];

  return (
    <div className="bg-foreground text-background py-2.5 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-xs tracking-wide">
          <Link 
            to={currentPromo.link}
            className="hover:underline transition-all"
          >
            {currentPromo.text}
          </Link>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-background/70 hover:text-background transition-colors"
        aria-label="Close promotion banner"
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default PromoStrip;
