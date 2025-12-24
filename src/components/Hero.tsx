import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const slides = [
  {
    image: heroImage,
    subtitle: "Timeless Elegance",
    title: "Handcrafted",
    titleHighlight: "with Love",
    description: "Discover our exquisite collection of handcrafted Indian ethnic wear, designed for the modern woman who celebrates tradition.",
    cta: "Explore Collection",
    link: "/shop"
  },
  {
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=1920&h=1080&fit=crop",
    subtitle: "Festive Season",
    title: "Celebrate Every",
    titleHighlight: "Moment",
    description: "Embrace the joy of festivals with our stunning collection of designer ethnic wear and accessories.",
    cta: "Shop Festive",
    link: "/shop?category=festive"
  },
  {
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&h=1080&fit=crop",
    subtitle: "Modern Comfort",
    title: "Effortless",
    titleHighlight: "Grace",
    description: "Contemporary designs meet traditional craftsmanship in our exclusive collection.",
    cta: "Discover More",
    link: "/shop?category=ethnic"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="relative h-[85vh] lg:h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-xl">
              <span 
                className={`inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4 transition-all duration-500 font-body ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {slide.subtitle}
              </span>
              
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 transition-all duration-500 font-heading ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {slide.title}{" "}
                <span className="text-primary">{slide.titleHighlight}</span>
              </h1>
              
              <p 
                className={`text-base lg:text-lg text-muted-foreground max-w-md mb-8 transition-all duration-500 font-body ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {slide.description}
              </p>

              <div 
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <Link to={slide.link}>
                  <Button size="lg" className="h-12 px-8 font-bold text-base">
                    {slide.cta}
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" size="lg" className="h-12 px-8 font-bold text-base border-2">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-primary w-8" 
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
