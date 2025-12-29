import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: heroImage,
    subtitle: "NEW ARRIVALS",
    title: "Festive Collection",
    description: "Celebrate in style with our curated ethnic wear",
    cta: "Shop now",
    link: "/shop?category=festive",
  },
  {
    image: hero2,
    subtitle: "THE EDIT",
    title: "Timeless Elegance",
    description: "Handcrafted pieces for the modern woman",
    cta: "Explore",
    link: "/shop",
  },
  {
    image: hero3,
    subtitle: "TRENDING NOW",
    title: "Effortless Grace",
    description: "Contemporary designs meet traditional craftsmanship",
    cta: "Discover",
    link: "/shop?category=ethnic",
  },
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
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section className="relative h-[85vh] lg:h-[90vh] overflow-hidden bg-secondary">
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
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-lg">
              {/* Subtitle */}
              <p
                className={`text-xs tracking-[0.3em] text-foreground/70 mb-4 transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                {slide.subtitle}
              </p>

              {/* Title */}
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight mb-6 transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {slide.title}
              </h1>

              {/* Description */}
              <p
                className={`text-sm lg:text-base text-foreground/80 mb-8 transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {slide.description}
              </p>

              {/* CTA */}
              <div
                className={`transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <Link
                  to={slide.link}
                  className="inline-block text-sm font-medium text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} strokeWidth={1} />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight size={24} strokeWidth={1} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentSlide) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 600);
              }
            }}
            disabled={isAnimating}
            className={`h-0.5 transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-foreground" : "w-4 bg-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
