import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import kurti1 from "@/assets/kurti-1.jpg";
import kurti2 from "@/assets/kurti-2.jpg";
import kurti3 from "@/assets/kurti-3.jpg";
import kurti4 from "@/assets/kurti-4.jpg";
import kurti5 from "@/assets/kurti-5.jpg";
import kurti6 from "@/assets/kurti-6.jpg";
import kurti7 from "@/assets/kurti-7.jpg";
import kurti8 from "@/assets/kurti-8.jpg";

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
    name: "Pink Chanderi Silk Anarkali",
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
  {
    id: "5",
    image: kurti5,
    name: "Rust Orange Bandhani Kurta",
    brand: "VASTRA",
    price: 2199,
    originalPrice: 2899,
    category: "Ethnic Wear",
  },
  {
    id: "6",
    image: kurti6,
    name: "Olive Green Palazzo Set",
    brand: "VASTRA",
    price: 3299,
    originalPrice: 4199,
    category: "Festive Wear",
  },
  {
    id: "7",
    image: kurti7,
    name: "Mustard Yellow Printed Kurti",
    brand: "VASTRA",
    price: 1599,
    originalPrice: 2099,
    category: "Casual Wear",
  },
  {
    id: "8",
    image: kurti8,
    name: "Beige Chikankari Kurta Set",
    brand: "VASTRA",
    price: 3599,
    originalPrice: 4599,
    category: "Festive Wear",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 animate-fade-in">
          <div>
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">
              Curated For You
            </span>
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mt-2">
              Featured Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-primary hover:underline group inline-flex items-center gap-1"
          >
            View All Products 
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
