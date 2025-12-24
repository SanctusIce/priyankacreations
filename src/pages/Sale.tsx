import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart, Star, Loader2, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sale = () => {
  const { data: products, isLoading } = useProducts({ sortBy: 'price_asc' });
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWishlistToggle = (productId: string) => {
    if (isInWishlist(productId)) removeFromWishlist(productId);
    else addToWishlist(productId);
  };

  const saleProducts = products?.filter(p => p.compare_at_price && p.compare_at_price > p.price) || [];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      <main className="pt-20 lg:pt-[102px]">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">🔥 MEGA SALE</h1>
            <p className="text-lg lg:text-xl mb-6 opacity-90">Up to 50% Off on Selected Items</p>
            <div className="inline-flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">Ends in:</span>
              <div className="flex gap-2">
                <div className="bg-primary-foreground text-primary px-3 py-1 rounded font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <span className="font-bold">:</span>
                <div className="bg-primary-foreground text-primary px-3 py-1 rounded font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <span className="font-bold">:</span>
                <div className="bg-primary-foreground text-primary px-3 py-1 rounded font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className="text-foreground font-medium">Sale</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : saleProducts.length === 0 ? (
            <div className="text-center py-16 bg-background rounded-lg">
              <p className="text-muted-foreground text-lg mb-4">No sale items available</p>
              <Link to="/shop"><Button className="font-bold">BROWSE ALL PRODUCTS</Button></Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {saleProducts.map((product) => {
                const discount = product.compare_at_price ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100) : 0;
                return (
                  <div key={product.id} className="product-card group bg-background">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                        <img src={product.images[0] || '/placeholder.svg'} alt={product.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold rounded">{discount}% OFF</div>
                        <button onClick={(e) => { e.preventDefault(); handleWishlistToggle(product.id); }} className="wishlist-btn">
                          <Heart size={16} className={cn("transition-colors", isInWishlist(product.id) ? "fill-primary text-primary" : "text-muted-foreground")} />
                        </button>
                        <div className="absolute bottom-2 left-2 rating-badge"><span>4.2</span><Star size={10} className="fill-current" /></div>
                      </div>
                    </Link>
                    <div className="p-3 space-y-1">
                      <h3 className="brand-name">{product.category?.name || 'VASTRA'}</h3>
                      <p className="product-name">{product.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="price-current">Rs. {product.price.toLocaleString()}</span>
                        {product.compare_at_price && <><span className="price-original">Rs. {product.compare_at_price.toLocaleString()}</span><span className="discount-badge">({discount}% OFF)</span></>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sale;
