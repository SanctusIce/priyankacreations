const categories = [
  {
    name: "Kurtis",
    description: "Elegant everyday wear",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=500&fit=crop",
    count: "120+ Styles"
  },
  {
    name: "Palazzo Pants",
    description: "Comfortable & stylish",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    count: "80+ Styles"
  },
  {
    name: "Kurti Sets",
    description: "Complete the look",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    count: "60+ Sets"
  },
  {
    name: "Ethnic Dresses",
    description: "For special occasions",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    count: "45+ Designs"
  },
];

const Categories = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-gold-dark tracking-widest uppercase">
            Browse By
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
            Shop Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={`#${category.name.toLowerCase().replace(' ', '-')}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] animate-fade-up shadow-soft hover:shadow-card transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-cream mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-cream/80 mb-2 hidden md:block">
                  {category.description}
                </p>
                <span className="text-xs text-gold-light font-medium">
                  {category.count}
                </span>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
