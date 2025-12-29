import { Link } from "react-router-dom";
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
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">
              New in
            </p>
            <h2 className="text-2xl lg:text-3xl font-normal text-foreground">
              Featured
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
          >
            View all
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
