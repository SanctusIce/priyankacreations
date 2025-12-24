import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, X, ChevronRight, Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Wishlist = () => {
  const { user } = useAuth();
  const { items: wishlistItems, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item: any) => {
    if (item.product) {
      await addToCart(item.product.id, 1);
      toast.success('Added to bag!');
    }
  };

  const handleRemove = async (productId: string) => {
    await removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Header />
        <main className="pt-20 lg:pt-[102px]">
          <div className="container mx-auto px-4 py-16 text-center">
            <Heart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-xl font-bold mb-2">PLEASE LOG IN</h1>
            <p className="text-muted-foreground mb-8">Login to view items in your wishlist.</p>
            <Link to="/auth">
              <Button size="lg" className="font-bold">LOGIN</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="pt-20 lg:pt-[102px]">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className="text-foreground font-medium">My Wishlist</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold">
              My Wishlist <span className="text-muted-foreground font-normal">({wishlistItems.length} items)</span>
            </h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-background rounded-lg">
              <Heart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-lg font-bold mb-2">YOUR WISHLIST IS EMPTY</h2>
              <p className="text-muted-foreground mb-8">Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</p>
              <Link to="/shop">
                <Button size="lg" className="font-bold">CONTINUE SHOPPING</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {wishlistItems.map((item) => {
                const discount = item.product?.compare_at_price
                  ? Math.round((1 - (item.product.price / item.product.compare_at_price)) * 100)
                  : 0;

                return (
                  <div key={item.id} className="product-card group bg-background relative">
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(item.product_id)}
                      className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-background shadow-md flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X size={16} />
                    </button>

                    <Link to={`/product/${item.product_id}`}>
                      <div className="aspect-[3/4] overflow-hidden bg-secondary">
                        <img
                          src={item.product?.images?.[0] || '/placeholder.svg'}
                          alt={item.product?.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Rating badge */}
                        <div className="absolute bottom-14 left-2 rating-badge">
                          <span>4.2</span>
                          <Star size={10} className="fill-current" />
                          <span className="opacity-75">| 1.2k</span>
                        </div>
                      </div>
                    </Link>

                    <div className="p-3">
                      <Link to={`/product/${item.product_id}`}>
                        <h3 className="brand-name">VASTRA</h3>
                        <p className="product-name">{item.product?.name}</p>
                      </Link>
                      
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        <span className="price-current">Rs. {item.product?.price?.toLocaleString()}</span>
                        {item.product?.compare_at_price && (
                          <>
                            <span className="price-original">Rs. {item.product.compare_at_price.toLocaleString()}</span>
                            <span className="discount-badge">({discount}% OFF)</span>
                          </>
                        )}
                      </div>

                      <Button
                        onClick={() => handleAddToCart(item)}
                        variant="outline"
                        className="w-full mt-3 font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        size="sm"
                      >
                        MOVE TO BAG
                      </Button>
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

export default Wishlist;
