import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Vastra - Premium Indian Ethnic Wear for Women | Kurtis, Pants & Sets</title>
        <meta 
          name="description" 
          content="Discover exquisite handcrafted Indian ethnic wear at Vastra. Shop premium kurtis, palazzo pants, and designer sets. Free shipping on orders above ₹999." 
        />
        <meta name="keywords" content="Indian ethnic wear, kurtis, palazzo pants, kurti sets, women's clothing, ethnic fashion, Indian fashion" />
        <link rel="canonical" href="https://vastra.com" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Categories />
          <FeaturedProducts />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
