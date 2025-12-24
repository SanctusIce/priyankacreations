import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    image: product1,
    name: "Teal Embroidered Kurti",
    price: 1899,
    originalPrice: 2499,
    category: "Kurtis",
    isNew: true,
    isSale: true,
  },
  {
    image: product2,
    name: "Maroon Palazzo Pants",
    price: 1299,
    category: "Pants",
    isNew: true,
  },
  {
    image: product3,
    name: "Pink Anarkali Set",
    price: 3999,
    originalPrice: 4999,
    category: "Sets",
    isSale: true,
  },
  {
    image: product4,
    name: "Navy Straight Kurti",
    price: 1599,
    category: "Kurtis",
    isNew: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section id="new-arrivals" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-gold-dark tracking-widest uppercase">
              Curated For You
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              New Arrivals
            </h2>
          </div>
          <a
            href="#all-products"
            className="text-sm font-medium text-primary hover:text-maroon-light transition-colors underline underline-offset-4"
          >
            View All Products →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
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
