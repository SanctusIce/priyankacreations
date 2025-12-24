import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, ArrowRight } from 'lucide-react';

const FlashDeal = () => {
  const { data: products } = useProducts();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  // Get a featured product on sale
  const flashProduct = products?.find(p => p.compare_at_price && p.compare_at_price > p.price && p.is_featured);

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
        return { hours: 2, minutes: 45, seconds: 30 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!flashProduct) return null;

  const discount = Math.round((1 - flashProduct.price / flashProduct.compare_at_price!) * 100);

  return (
    <section className="py-8 bg-gradient-to-r from-primary via-maroon-light to-primary">
      <div className="container mx-auto px-4">
        <Card className="bg-background/95 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left - Flash Deal Badge */}
              <div className="bg-accent p-6 flex flex-col items-center justify-center md:min-w-[200px]">
                <Zap className="h-10 w-10 text-accent-foreground mb-2 animate-pulse" />
                <h3 className="font-heading text-xl font-bold text-accent-foreground">FLASH DEAL</h3>
                
                {/* Timer */}
                <div className="flex items-center gap-1 mt-3">
                  <Clock className="h-4 w-4 text-accent-foreground" />
                  <div className="flex gap-1 text-accent-foreground font-mono font-bold">
                    <span className="bg-accent-foreground/20 px-2 py-1 rounded">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    :
                    <span className="bg-accent-foreground/20 px-2 py-1 rounded">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    :
                    <span className="bg-accent-foreground/20 px-2 py-1 rounded">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center - Product */}
              <div className="flex-1 flex items-center gap-6 p-6">
                <img
                  src={flashProduct.images?.[0] || '/placeholder.svg'}
                  alt={flashProduct.name}
                  className="w-24 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Badge className="bg-destructive text-destructive-foreground mb-2">
                    {discount}% OFF
                  </Badge>
                  <h4 className="font-heading text-lg font-semibold mb-1">{flashProduct.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-2xl font-bold text-primary">
                      ₹{flashProduct.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground line-through">
                      ₹{flashProduct.compare_at_price?.toLocaleString()}
                    </span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Save ₹{(flashProduct.compare_at_price! - flashProduct.price).toLocaleString()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right - CTA */}
              <div className="p-6">
                <Link to={`/product/${flashProduct.id}`}>
                  <Button variant="gold" size="lg" className="group">
                    Grab Deal
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FlashDeal;
