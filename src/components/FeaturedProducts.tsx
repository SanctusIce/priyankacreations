import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import kurti1 from "@/assets/kurti-1.jpg";
import kurti2 from "@/assets/kurti-2.jpg";
import kurti3 from "@/assets/kurti-3.jpg";
import kurti4 from "@/assets/kurti-4.jpg";

const products = [
  {
    id: "1",
    image: kurti1,
    name: "Maroon Embroidered A-Line Kurta",
    brand: "VASTRA",
    price: 2499,
    originalPrice: 3299,
    category: "Ethnic Wear",
  },
  {
    id: "2",
    image: kurti2,
    name: "Teal Cotton Straight Kurta",
    brand: "VASTRA",
    price: 1899,
    originalPrice: 2499,
    category: "Ethnic Wear",
  },
  {
    id: "3",
    image: kurti3,
    name: "Blue Checkered Shirt Suit",
    brand: "VASTRA",
    price: 3999,
    originalPrice: 4999,
    category: "Festive Wear",
  },
  {
    id: "4",
    image: kurti4,
    name: "Navy Blue Printed Kurta Set",
    brand: "VASTRA",
    price: 2799,
    originalPrice: 3599,
    category: "Ethnic Wear",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-medium text-primary tracking-[0.2em] uppercase">
              Curated For You
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">
              Featured Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 group"
          >
            View All Products 
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-in"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
