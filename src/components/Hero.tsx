import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Elegant Indian ethnic wear featuring traditional embroidered kurti"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <span 
            className="inline-block text-sm md:text-base font-medium text-gold-dark tracking-widest uppercase mb-4 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            New Collection 2025
          </span>
          
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Timeless Elegance,{" "}
            <span className="text-primary">Modern Grace</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Discover our exquisite collection of handcrafted Indian ethnic wear. 
            From elegant kurtis to stunning sets, celebrate tradition with contemporary style.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero">
              Shop Collection
            </Button>
            <Button variant="hero-outline">
              View Lookbook
            </Button>
          </div>

          {/* Trust badges */}
          <div 
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border/50 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-gold">✦</span>
              <span>Handcrafted with Love</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-gold">✦</span>
              <span>100% Cotton Fabrics</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-gold">✦</span>
              <span>Free Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
