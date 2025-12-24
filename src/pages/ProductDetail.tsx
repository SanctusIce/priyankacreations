import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, ShoppingBag, Minus, Plus, Star, Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || '');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (product) {
      if (product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0].name);
      }
    }
  }, [product, selectedSize, selectedColor]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity, selectedSize, selectedColor);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-[70px]">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} className="text-muted-foreground" />
              <Link to="/shop" className="breadcrumb-link">Shop</Link>
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className="text-foreground font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Thumbnails + Main Image Layout */}
              <div className="flex gap-4">
                {/* Thumbnails - Vertical */}
                {product.images.length > 1 && (
                  <div className="hidden sm:flex flex-col gap-3 w-16">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "aspect-[3/4] rounded overflow-hidden border-2 transition-all",
                          selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="flex-1 aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={product.images[selectedImage] || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Mobile Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex sm:hidden gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-20 rounded overflow-hidden border-2 transition-all",
                        selectedImage === index ? "border-primary" : "border-transparent"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Category */}
              <div>
                <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground mt-1">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="rating-badge">
                    <span>4.2</span>
                    <Star size={10} className="fill-current" />
                  </div>
                  <span className="text-sm text-muted-foreground">2.3k Ratings</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl font-bold text-foreground">Rs. {product.price.toLocaleString()}</span>
                {product.compare_at_price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      MRP Rs. {product.compare_at_price.toLocaleString()}
                    </span>
                    <span className="text-lg font-bold text-myntra-orange">({discount}% OFF)</span>
                  </>
                )}
              </div>
              <p className="text-sm text-success font-semibold">inclusive of all taxes</p>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-bold uppercase">Select Size</label>
                    <button className="text-sm text-primary font-semibold hover:underline">SIZE CHART</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "size-btn",
                          selectedSize === size && "active"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-bold uppercase mb-4">
                    Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all",
                          selectedColor === color.name
                            ? "border-primary ring-2 ring-primary ring-offset-2"
                            : "border-border"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-14 text-base font-bold"
                  size="lg"
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.stock_quantity === 0 ? 'OUT OF STOCK' : 'ADD TO BAG'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-6 border-2"
                  onClick={handleWishlistToggle}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      isInWishlist(product.id) ? "fill-primary text-primary" : ""
                    )}
                  />
                  <span className="ml-2 font-bold">WISHLIST</span>
                </Button>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Delivery & Services */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase">Delivery Options</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Get it by Thu, Dec 26</p>
                      <p className="text-xs text-muted-foreground">Free delivery on orders above Rs. 499</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <RefreshCw className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Easy 14 days returns</p>
                      <p className="text-xs text-muted-foreground">Change of mind applicable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">100% Authentic</p>
                      <p className="text-xs text-muted-foreground">All products are verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-bold uppercase mb-4">Product Details</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
