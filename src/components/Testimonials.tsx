import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely love the quality and craftsmanship! The maroon kurta I ordered fits perfectly and the embroidery is stunning. Will definitely order again.",
    product: "Maroon Embroidered A-Line Kurta",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    text: "Fast delivery and excellent packaging. The fabric quality exceeded my expectations. The customer service team was very helpful with sizing.",
    product: "Pink Chanderi Silk Anarkali",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Meera Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "I have been looking for authentic ethnic wear online and Vastra is a gem! The colors are exactly as shown and the fit is true to size.",
    product: "Teal Cotton Straight Kurta",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Kavitha Nair",
    location: "Chennai",
    rating: 5,
    text: "Received so many compliments at my cousin's wedding! The palazzo set was comfortable to wear all day and looked absolutely gorgeous.",
    product: "Olive Green Palazzo Set",
    date: "1 week ago"
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
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase font-body">
            Customer Love
          </span>
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mt-2 font-heading">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
            <Quote className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
          </div>

          {/* Main Card */}
          <div className="bg-card rounded-2xl shadow-lg p-8 lg:p-12 pt-12">
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 font-body">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Product Purchased */}
              <p className="text-sm text-primary font-semibold mb-4 font-body">
                Purchased: {testimonials[currentIndex].product}
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary font-heading">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground font-body">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-background shadow-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-background shadow-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground font-heading">10K+</p>
            <p className="text-sm font-body">Happy Customers</p>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground font-heading">4.8</p>
            <p className="text-sm font-body">Average Rating</p>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground font-heading">500+</p>
            <p className="text-sm font-body">5-Star Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
