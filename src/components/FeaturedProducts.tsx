import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: "1",
    image: product1,
    name: "Teal Embroidered Kurti",
    brand: "VASTRA",
    price: 1899,
    originalPrice: 2499,
    category: "Kurtis",
    isNew: true,
    rating: 4.3,
    ratingCount: 2156,
  },
  {
    id: "2",
    image: product2,
    name: "Maroon Palazzo Pants",
    brand: "VASTRA",
    price: 1299,
    originalPrice: 1799,
    category: "Pants",
    isNew: true,
    rating: 4.1,
    ratingCount: 892,
  },
  {
    id: "3",
    image: product3,
    name: "Pink Anarkali Set",
    brand: "VASTRA",
    price: 3999,
    originalPrice: 4999,
    category: "Sets",
    rating: 4.5,
    ratingCount: 3241,
  },
  {
    id: "4",
    image: product4,
    name: "Navy Straight Kurti",
    brand: "VASTRA",
    price: 1599,
    originalPrice: 2199,
    category: "Kurtis",
    isNew: true,
    rating: 4.2,
    ratingCount: 1567,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">
              Trending Now
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-2">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="text-sm font-semibold text-primary hover:underline"
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
