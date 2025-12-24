import { Link } from "react-router-dom";
import categoryEthnic from "@/assets/category-ethnic.jpg";
import categoryWestern from "@/assets/category-western.jpg";
import categoryFestive from "@/assets/category-festive.jpg";
import categoryParty from "@/assets/category-party.jpg";

const categories = [
  {
    name: "Ethnic Wear",
    description: "Traditional elegance",
    image: categoryEthnic,
    link: "/shop?category=ethnic"
  },
  {
    name: "Western Wear",
    description: "Modern & stylish",
    image: categoryWestern,
    link: "/shop?category=western"
  },
  {
    name: "Festive Collection",
    description: "Celebrate in style",
    image: categoryFestive,
    link: "/shop?category=festive"
  },
  {
    name: "Party Wear",
    description: "For special occasions",
    image: categoryParty,
    link: "/shop?category=party"
  },
];

const Categories = () => {
  return (
    <section className="py-12 lg:py-20 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase font-body">
            Browse By
          </span>
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mt-2 font-heading">
            Shop Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] opacity-0 animate-scale-in"
              style={{ 
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                <h3 className="text-lg lg:text-xl font-bold text-background mb-1 font-heading">
                  {category.name}
                </h3>
                <p className="text-sm text-background/80 hidden lg:block font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>

              {/* Hover border with glow */}
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg shadow-[0_0_20px_rgba(var(--primary),0.3)]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
