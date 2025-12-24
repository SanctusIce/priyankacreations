import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlistItems, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item: any) => {
    if (item.products) {
      await addToCart(item.products.id, 1);
      toast.success('Added to cart!');
    }
  };

  const handleRemove = async (productId: string) => {
    await removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-heading text-2xl mb-4">Sign in to view your wishlist</h1>
          <p className="text-muted-foreground mb-6">Save your favorite items and access them anytime</p>
          <Link to="/auth">
            <Button variant="gold">Sign In</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-heading text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-2xl mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start adding items you love</p>
            <Link to="/shop">
              <Button variant="gold">Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.products?.images?.[0] || '/placeholder.svg'}
                    alt={item.products?.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemove(item.product_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {item.products?.compare_at_price && (
                    <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium rounded">
                      {Math.round((1 - item.products.price / item.products.compare_at_price) * 100)}% OFF
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <Link to={`/product/${item.product_id}`}>
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                      {item.products?.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-heading text-lg font-bold text-primary">
                      ₹{item.products?.price?.toLocaleString()}
                    </span>
                    {item.products?.compare_at_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{item.products.compare_at_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant="gold"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
