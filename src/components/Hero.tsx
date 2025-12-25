import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: heroImage,
    subtitle: "FESTIVE SEASON",
    title: "Celebrate Every",
    titleHighlight: "Moment",
    description: "Embrace the joy of festivals with our stunning collection of designer ethnic wear and accessories handcrafted for you.",
    cta: "Shop Festive",
    ctaSecondary: "View All",
    link: "/shop?category=festive"
  },
  {
    image: hero2,
    subtitle: "TIMELESS ELEGANCE",
    title: "Handcrafted",
    titleHighlight: "with Love",
    description: "Discover our exquisite collection of handcrafted Indian ethnic wear, designed for the modern woman who celebrates tradition.",
    cta: "Explore Collection",
    ctaSecondary: "View All",
    link: "/shop"
  },
  {
    image: hero3,
    subtitle: "MODERN COMFORT",
    title: "Effortless",
    titleHighlight: "Grace",
    description: "Contemporary designs meet traditional craftsmanship in our exclusive collection.",
    cta: "Discover More",
    ctaSecondary: "View All",
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
    <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
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
            {/* Gradient overlay - stronger on left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-lg">
              <span 
                className={`inline-block text-xs font-semibold text-background/80 tracking-[0.2em] uppercase mb-3 transition-all duration-500 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {slide.subtitle}
              </span>
              
              <h1 
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-background leading-tight mb-4 transition-all duration-500 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {slide.title}
                <br />
                <span className="text-primary">{slide.titleHighlight}</span>
              </h1>
              
              <p 
                className={`text-sm lg:text-base text-background/80 max-w-md mb-6 leading-relaxed transition-all duration-500 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {slide.description}
              </p>

              <div 
                className={`flex flex-wrap gap-3 transition-all duration-500 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <Link to={slide.link}>
                  <Button size="lg" className="h-11 px-6 font-semibold text-sm rounded-sm">
                    {slide.cta}
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-11 px-6 font-semibold text-sm border-background text-background hover:bg-background hover:text-foreground rounded-sm"
                  >
                    {slide.ctaSecondary}
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-background w-6" 
                : "bg-background/50 hover:bg-background/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
