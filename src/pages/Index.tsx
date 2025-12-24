import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import PromoBanners from "@/components/PromoBanners";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Vastra - Premium Women's Ethnic & Western Wear | Kurtis, Dresses & More";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover exquisite handcrafted women's ethnic and western wear at Vastra. Shop premium kurtis, dresses, palazzo sets and more. Free shipping on orders above ₹999.");
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 lg:pt-[102px]">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <PromoBanners />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
