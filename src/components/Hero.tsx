import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: heroImage,
    video: "https://cdn.pixabay.com/video/2023/07/22/172787-849815892_large.mp4",
    subtitle: "FESTIVE SEASON",
    title: "Celebrate Every",
    titleHighlight: "Moment",
    description:
      "Embrace the joy of festivals with our stunning collection of designer ethnic wear and accessories handcrafted for you.",
    cta: "Shop Festive",
    ctaSecondary: "View All",
    link: "/shop?category=festive",
  },
  {
    image: hero2,
    video: "https://cdn.pixabay.com/video/2022/10/25/136521-764270956_large.mp4",
    subtitle: "TIMELESS ELEGANCE",
    title: "Handcrafted",
    titleHighlight: "with Love",
    description:
      "Discover our exquisite collection of handcrafted Indian ethnic wear, designed for the modern woman who celebrates tradition.",
    cta: "Explore Collection",
    ctaSecondary: "View All",
    link: "/shop",
  },
  {
    image: hero3,
    video: "https://cdn.pixabay.com/video/2023/04/18/159323-820034330_large.mp4",
    subtitle: "MODERN COMFORT",
    title: "Effortless",
    titleHighlight: "Grace",
    description: "Contemporary designs meet traditional craftsmanship in our exclusive collection.",
    cta: "Discover More",
    ctaSecondary: "View All",
    link: "/shop?category=ethnic",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <section className="relative h-[70vh] lg:h-[90vh] overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float-delayed"></div>
        <Sparkles className="absolute top-20 right-1/4 text-background/30 animate-pulse" size={24} />
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
          }`}
        >
          {/* Background Video/Image with Parallax */}
          <div
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            {useVideo && slide.video && index === currentSlide ? (
              <>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onError={() => setUseVideo(false)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
                {/* Stronger gradient overlay for video */}
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              </>
            ) : (
              <>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-[10000ms] hover:scale-110"
                />
                {/* Gradient overlay for images */}
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </>
            )}

            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 backdrop-blur-[1px]"></div>
          </div>

          {/* Content with Enhanced Animations */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl">
              {/* Animated Badge */}
              <div
                className={`inline-block mb-4 transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-md border border-background/20 rounded-full text-xs font-semibold text-background tracking-[0.2em] uppercase">
                  <Sparkles size={12} className="animate-pulse" />
                  {slide.subtitle}
                </span>
              </div>

              {/* Title with Stagger Animation */}
              <h1
                className={`text-4xl md:text-5xl lg:text-7xl font-bold text-background leading-tight mb-6 transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <span className="block animate-fade-in-up">{slide.title}</span>
                <span
                  className="block text-primary drop-shadow-2xl animate-fade-in-up"
                  style={{ animationDelay: "100ms" }}
                >
                  {slide.titleHighlight}
                </span>
              </h1>

              {/* Description with Blur Effect */}
              <p
                className={`text-base lg:text-lg text-background/90 max-w-xl mb-8 leading-relaxed font-light backdrop-blur-sm transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {slide.description}
              </p>

              {/* CTA Buttons with Hover Effects */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-700 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <Link to={slide.link}>
                  <Button
                    size="lg"
                    className="h-12 px-8 font-semibold text-sm rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 group"
                  >
                    {slide.cta}
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 font-semibold text-sm rounded-full border-2 border-background text-background hover:bg-background hover:text-foreground backdrop-blur-sm bg-background/10 transition-all duration-300 hover:scale-105"
                  >
                    {slide.ctaSecondary}
                  </Button>
                </Link>
              </div>

              {/* Animated Scroll Indicator */}
              {index === currentSlide && (
                <div className="absolute bottom-8 left-0 animate-bounce">
                  <div className="w-6 h-10 border-2 border-background/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-background rounded-full animate-scroll-down"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Enhanced Design */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-md border border-background/30 flex items-center justify-center text-background hover:bg-background/30 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-md border border-background/30 flex items-center justify-center text-background hover:bg-background/30 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Enhanced Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`relative transition-all duration-500 disabled:cursor-not-allowed ${
              index === currentSlide ? "w-12 h-3" : "w-3 h-3 hover:scale-125"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`w-full h-full rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-background shadow-lg shadow-background/50"
                  : "bg-background/40 backdrop-blur-sm hover:bg-background/60"
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-accent/50 animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Video/Image Toggle (Optional) */}
      <button
        onClick={() => setUseVideo(!useVideo)}
        className="absolute bottom-8 right-8 z-20 px-4 py-2 rounded-full bg-background/20 backdrop-blur-md border border-background/30 text-background text-xs font-medium hover:bg-background/30 transition-all duration-300"
      >
        {useVideo ? "📹 Video" : "🖼️ Image"}
      </button>
    </section>
  );
};

export default Hero;
