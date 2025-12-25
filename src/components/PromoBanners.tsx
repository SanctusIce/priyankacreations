import { Link } from "react-router-dom";
import { Truck, RotateCcw, Shield, Headphones } from "lucide-react";
import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";

const banners = [
  {
    title: "Festive Collection",
    subtitle: "UP TO 40% OFF",
    image: promo1,
    link: "/shop?category=festive",
  },
  {
    title: "New Season Arrivals",
    subtitle: "FRESH STYLES",
    image: promo2,
    link: "/shop?sort=newest",
  }
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "15-day return policy"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support"
  }
];

const PromoBanners = () => {
  return (
    <>
      {/* Dual Banners */}
      <section className="py-8 lg:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            {banners.map((banner, index) => (
              <Link
                key={index}
                to={banner.link}
                className="group relative overflow-hidden rounded-lg h-44 lg:h-56"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
                <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-center">
                  <p className="text-xs font-medium text-background/80 uppercase tracking-wide">
                    {banner.subtitle}
                  </p>
                  <h3 className="text-xl lg:text-2xl font-bold text-background mt-1 italic">
                    {banner.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-background group-hover:underline">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-6 lg:py-8 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PromoBanners;
