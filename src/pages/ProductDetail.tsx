import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import fallback images
import kurti1 from "@/assets/kurti-1.jpg";
import kurti2 from "@/assets/kurti-2.jpg";
import kurti3 from "@/assets/kurti-3.jpg";
import kurti4 from "@/assets/kurti-4.jpg";
import kurti5 from "@/assets/kurti-5.jpg";

const fallbackImages = [kurti1, kurti2, kurti3, kurti4, kurti5];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || '');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

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
      addToCart(product.id, 1, selectedSize, selectedColor);
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

  // Get product images with fallback
  const getProductImages = () => {
    if (product?.images && product.images.length > 0 && product.images[0] !== '/placeholder.svg') {
      return product.images;
    }
    return fallbackImages;
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
          <h1 className="text-2xl font-bold mb-4 font-heading">Product Not Found</h1>
          <p className="text-muted-foreground mb-8 font-body">The product you are looking for does not exist.</p>
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

  const productImages = getProductImages();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-[70px]">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm font-body">
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
            {/* Images with Carousel */}
            <div className="space-y-4">
              {/* Main Image Carousel */}
              <div className="relative">
                <Carousel className="w-full" opts={{ loop: true }}>
                  <CarouselContent>
                    {productImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {productImages.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm hover:bg-background" />
                      <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm hover:bg-background" />
                    </>
                  )}
                </Carousel>

                {/* Image Counter Badge */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {productImages.length} Images
                  </div>
                )}
              </div>

              {/* Thumbnails Strip */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-20 rounded-md overflow-hidden border-2 transition-all duration-300",
                        selectedImage === index 
                          ? "border-primary ring-2 ring-primary/20" 
                          : "border-transparent hover:border-muted-foreground opacity-70 hover:opacity-100"
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
                <p className="text-sm text-muted-foreground font-body">{product.category?.name}</p>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground mt-1 font-heading">{product.name}</h1>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl font-bold text-foreground font-body">₹{product.price.toLocaleString()}</span>
                {product.compare_at_price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through font-body">
                      MRP ₹{product.compare_at_price.toLocaleString()}
                    </span>
                    <span className="text-lg font-bold text-primary font-body">({discount}% OFF)</span>
                  </>
                )}
              </div>
              <p className="text-sm text-success font-semibold font-body">inclusive of all taxes</p>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-bold uppercase font-body">Select Size</label>
                    <Dialog open={sizeChartOpen} onOpenChange={setSizeChartOpen}>
                      <DialogTrigger asChild>
                        <button className="text-sm text-primary font-semibold hover:underline font-body">
                          SIZE CHART
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="font-heading text-xl">Size Guide</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          {/* How to Measure */}
                          <div className="mb-6">
                            <h3 className="font-bold text-foreground font-heading mb-3">How to Measure</h3>
                            <div className="grid grid-cols-3 gap-3 text-sm">
                              <div className="bg-secondary/50 p-3 rounded">
                                <p className="font-semibold font-body">Bust</p>
                                <p className="text-muted-foreground font-body text-xs">Measure around fullest part</p>
                              </div>
                              <div className="bg-secondary/50 p-3 rounded">
                                <p className="font-semibold font-body">Waist</p>
                                <p className="text-muted-foreground font-body text-xs">Measure at natural waistline</p>
                              </div>
                              <div className="bg-secondary/50 p-3 rounded">
                                <p className="font-semibold font-body">Hips</p>
                                <p className="text-muted-foreground font-body text-xs">Measure around fullest part</p>
                              </div>
                            </div>
                          </div>

                          {/* Size Chart Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead>
                                <tr className="bg-secondary">
                                  <th className="border border-border p-2 text-left font-bold font-body">Size</th>
                                  <th className="border border-border p-2 text-left font-bold font-body">Bust (in)</th>
                                  <th className="border border-border p-2 text-left font-bold font-body">Waist (in)</th>
                                  <th className="border border-border p-2 text-left font-bold font-body">Hip (in)</th>
                                </tr>
                              </thead>
                              <tbody className="font-body text-muted-foreground">
                                <tr><td className="border border-border p-2 font-semibold text-foreground">XS</td><td className="border border-border p-2">32-34</td><td className="border border-border p-2">26-28</td><td className="border border-border p-2">34-36</td></tr>
                                <tr className="bg-secondary/30"><td className="border border-border p-2 font-semibold text-foreground">S</td><td className="border border-border p-2">34-36</td><td className="border border-border p-2">28-30</td><td className="border border-border p-2">36-38</td></tr>
                                <tr><td className="border border-border p-2 font-semibold text-foreground">M</td><td className="border border-border p-2">36-38</td><td className="border border-border p-2">30-32</td><td className="border border-border p-2">38-40</td></tr>
                                <tr className="bg-secondary/30"><td className="border border-border p-2 font-semibold text-foreground">L</td><td className="border border-border p-2">38-40</td><td className="border border-border p-2">32-34</td><td className="border border-border p-2">40-42</td></tr>
                                <tr><td className="border border-border p-2 font-semibold text-foreground">XL</td><td className="border border-border p-2">40-42</td><td className="border border-border p-2">34-36</td><td className="border border-border p-2">42-44</td></tr>
                                <tr className="bg-secondary/30"><td className="border border-border p-2 font-semibold text-foreground">2XL</td><td className="border border-border p-2">42-44</td><td className="border border-border p-2">36-38</td><td className="border border-border p-2">44-46</td></tr>
                              </tbody>
                            </table>
                          </div>

                          <p className="text-xs text-muted-foreground mt-4 font-body">
                            * If you are between sizes, we recommend going for the larger size for a comfortable fit.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
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
                  <label className="block text-sm font-bold uppercase mb-4 font-body">
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
                <h3 className="text-sm font-bold uppercase font-body">Delivery Options</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold font-body">Get it by Thu, Dec 26</p>
                      <p className="text-xs text-muted-foreground font-body">Free delivery on orders above ₹999</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <RefreshCw className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold font-body">Easy 15 days returns</p>
                      <p className="text-xs text-muted-foreground font-body">Change of mind applicable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold font-body">100% Authentic</p>
                      <p className="text-xs text-muted-foreground font-body">All products are verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-bold uppercase mb-4 font-body">Product Details</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">{product.description}</p>
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
