import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timer, Flame, Sparkles, TrendingDown } from 'lucide-react';

const Sale = () => {
  const { data: products, isLoading } = useProducts();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Sale products - products with compare_at_price
  const saleProducts = products?.filter(p => p.compare_at_price && p.compare_at_price > p.price) || [];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary via-primary to-maroon-light overflow-hidden">
        <div className="absolute inset-0 opacity-50" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-accent animate-pulse" />
              <Badge variant="secondary" className="bg-accent text-accent-foreground font-bold text-lg px-4 py-1">
                MEGA SALE
              </Badge>
              <Flame className="h-6 w-6 text-accent animate-pulse" />
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
              Up to <span className="text-accent">50% OFF</span>
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Limited time offer on exclusive collections
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Timer className="h-6 w-6" />
              <div className="flex gap-2">
                <div className="bg-background/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-heading text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <p className="text-xs opacity-75">HOURS</p>
                </div>
                <span className="text-3xl font-bold">:</span>
                <div className="bg-background/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-heading text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <p className="text-xs opacity-75">MINS</p>
                </div>
                <span className="text-3xl font-bold">:</span>
                <div className="bg-background/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-heading text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <p className="text-xs opacity-75">SECS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Highlights */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { icon: TrendingDown, label: 'Price Drop', value: 'Up to 50%' },
              { icon: Sparkles, label: 'New Arrivals', value: 'On Sale' },
              { icon: Timer, label: 'Flash Deals', value: 'Every Hour' },
              { icon: Flame, label: 'Hot Picks', value: 'Best Sellers' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 py-4">
                <item.icon className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-heading font-bold text-primary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl font-bold">Sale Items</h2>
            <p className="text-muted-foreground">{saleProducts.length} products on sale</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-lg" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : saleProducts.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-2xl mb-2">No sale items right now</h2>
            <p className="text-muted-foreground mb-6">Check back soon for amazing deals!</p>
            <Link to="/shop">
              <Button variant="gold">Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Sale;
