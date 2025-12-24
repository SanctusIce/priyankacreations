import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import PromoStrip from "@/components/PromoStrip";
import FlashDeal from "@/components/FlashDeal";

const Index = () => {
  useEffect(() => {
    document.title = "Vastra - Premium Indian Ethnic Wear for Women | Kurtis, Pants & Sets";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover exquisite handcrafted Indian ethnic wear at Vastra. Shop premium kurtis, palazzo pants, and designer sets. Free shipping on orders above ₹999.");
    }
  }, []);

  return (
    <div className="min-h-screen">
      <PromoStrip />
      <Header />
      <main>
        <Hero />
        <FlashDeal />
        <Categories />
        <FeaturedProducts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
