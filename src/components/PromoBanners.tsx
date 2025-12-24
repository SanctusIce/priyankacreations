import { Link } from "react-router-dom";
import { Truck, RotateCcw, Shield, Headphones } from "lucide-react";
import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";

const banners = [
  {
    title: "Festive Collection",
    subtitle: "Up to 40% Off",
    image: promo1,
    link: "/shop?category=festive",
  },
  {
    title: "New Season Arrivals",
    subtitle: "Fresh Styles",
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
    description: "15 day return policy"
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
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {banners.map((banner, index) => (
              <Link
                key={index}
                to={banner.link}
                className="group relative overflow-hidden rounded-xl h-48 lg:h-64"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-wide font-body">
                    {banner.subtitle}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mt-1 font-heading">
                    {banner.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-foreground group-hover:underline font-body">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-8 lg:py-12 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground font-body">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground font-body">{feature.description}</p>
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
