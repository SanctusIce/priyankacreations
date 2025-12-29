import { Link } from "react-router-dom";
import categoryEthnic from "@/assets/category-ethnic.jpg";
import categoryWestern from "@/assets/category-western.jpg";
import categoryFestive from "@/assets/category-festive.jpg";
import categoryParty from "@/assets/category-party.jpg";

const categories = [
  {
    name: "Ethnic Wear",
    image: categoryEthnic,
    link: "/ethnic-wear"
  },
  {
    name: "Western Wear",
    image: categoryWestern,
    link: "/western-wear"
  },
  {
    name: "Festive Collection",
    image: categoryFestive,
    link: "/shop?category=festive"
  },
  {
    name: "Party Wear",
    image: categoryParty,
    link: "/shop?category=party"
  },
];

const Categories = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
            Shop by
          </p>
          <h2 className="text-2xl lg:text-3xl font-normal text-foreground">
            Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden aspect-[3/4] opacity-0 animate-fade-in"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="text-sm lg:text-base font-medium text-background tracking-wide">
                  {category.name}
                </h3>
                <span className="text-xs text-background/70 mt-1 inline-block border-b border-background/50 pb-0.5 group-hover:border-background transition-colors">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
