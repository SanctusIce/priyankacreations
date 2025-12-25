import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase">
            Browse By
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-2">
            Shop Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden rounded-lg aspect-square opacity-0 animate-scale-in"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Subtle overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-base lg:text-lg font-semibold text-background">
                  {category.name}
                </h3>
              </div>

              {/* Arrow icon on hover */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={14} className="text-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
