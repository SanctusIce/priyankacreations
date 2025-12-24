import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const products = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    name: "Maroon Embroidered A-Line Kurta",
    brand: "VASTRA",
    price: 2499,
    originalPrice: 3299,
    category: "Ethnic Wear",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=500&fit=crop",
    name: "Teal Cotton Straight Kurta",
    brand: "VASTRA",
    price: 1899,
    originalPrice: 2499,
    category: "Ethnic Wear",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    name: "Pink Chanderi Silk Anarkali",
    brand: "VASTRA",
    price: 3999,
    originalPrice: 4999,
    category: "Festive Wear",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    name: "Navy Blue Printed Kurta Set",
    brand: "VASTRA",
    price: 2799,
    originalPrice: 3599,
    category: "Ethnic Wear",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-semibold text-primary tracking-widest uppercase font-body">
              Curated For You
            </span>
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mt-2 font-heading">
              Featured Collection
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="text-sm font-semibold text-primary hover:underline font-body"
          >
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
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
