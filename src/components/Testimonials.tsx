import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "CLOTHS • 1 WEEK AGO",
    rating: 5,
    text: "Absolutely love the quality and craftsmanship! The maroon kurta I ordered fits perfectly and the embroidery is stunning. Will definitely order again.",
    product: "PURCHASED: MAROON EMBROIDERED A-LINE KURTA",
    avatar: "P"
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "CLOTHS • 2 WEEKS AGO",
    rating: 5,
    text: "Fast delivery and excellent packaging. The fabric quality exceeded my expectations. The customer service team was very helpful with sizing.",
    product: "PURCHASED: PINK CHANDERI SILK ANARKALI",
    avatar: "A"
  },
  {
    id: 3,
    name: "Meera Patel",
    location: "CLOTHS • 3 WEEKS AGO",
    rating: 5,
    text: "I have been looking for authentic ethnic wear online and Vastra is a gem! The colors are exactly as shown and the fit is true to size.",
    product: "PURCHASED: TEAL COTTON STRAIGHT KURTA",
    avatar: "M"
  },
  {
    id: 4,
    name: "Kavitha Nair",
    location: "CLOTHS • 1 MONTH AGO",
    rating: 5,
    text: "Received so many compliments at my cousin's wedding! The palazzo set was comfortable to wear all day and looked absolutely gorgeous.",
    product: "PURCHASED: OLIVE GREEN PALAZZO SET",
    avatar: "K"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-medium text-primary tracking-[0.2em] uppercase">
            Customer Love
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-2">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-2xl mx-auto">
          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Quote className="w-4 h-4 text-primary fill-primary" />
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-accent fill-accent" />
            ))}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-center text-base lg:text-lg text-foreground leading-relaxed mb-6 italic px-4">
            "{testimonials[currentIndex].text}"
          </blockquote>

          {/* Product Purchased */}
          <p className="text-center text-xs text-primary font-semibold tracking-wide mb-4">
            {testimonials[currentIndex].product}
          </p>

          {/* Customer Info */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {testimonials[currentIndex].avatar}
              </span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-foreground">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-xs text-muted-foreground">
                {testimonials[currentIndex].location}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Trust Stats */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-8 lg:gap-12 text-muted-foreground">
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-foreground">10K+</p>
            <p className="text-xs uppercase tracking-wide">Happy Customers</p>
          </div>
          <div className="w-px h-10 bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-foreground">4.8</p>
            <p className="text-xs uppercase tracking-wide">Average Rating</p>
          </div>
          <div className="w-px h-10 bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-foreground">500+</p>
            <p className="text-xs uppercase tracking-wide">5-Star Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
