import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Timer, Flame, Sparkles, TrendingDown, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

const Sale = () => {
  const { data: products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  const handleWishlistToggle = async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary via-primary to-primary/80 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-accent to-transparent" />
        
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
            {saleProducts.map((product) => {
              const discount = product.compare_at_price 
                ? Math.round((1 - product.price / product.compare_at_price) * 100) 
                : 0;
              
              return (
                <Card key={product.id} className="group overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images?.[0] || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded">
                      {discount}% OFF
                    </div>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleWishlistToggle(product.id)}
                      className="absolute top-2 right-2 w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-primary text-primary' : 'text-foreground/60'}`}
                      />
                    </button>
                    
                    {/* Quick Add */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button 
                        variant="gold" 
                        className="w-full gap-2"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-heading text-lg font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.compare_at_price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.compare_at_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                      Save ₹{((product.compare_at_price || 0) - product.price).toLocaleString()}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Sale;
