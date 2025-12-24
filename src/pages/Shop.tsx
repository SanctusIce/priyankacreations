import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, Filter, Grid3X3, LayoutGrid, Loader2, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

const Shop = () => {
  const [search, setSearch] = useState('');
  const [categorySlug, setCategorySlug] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name'>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const { data: products, isLoading } = useProducts({
    search,
    categorySlug: categorySlug || undefined,
    sortBy,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  const { data: categories } = useCategories();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all"
              checked={categorySlug === ''}
              onCheckedChange={() => setCategorySlug('')}
            />
            <Label htmlFor="all" className="cursor-pointer">All Products</Label>
          </div>
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.slug}
                checked={categorySlug === category.slug}
                onCheckedChange={() => setCategorySlug(category.slug)}
              />
              <Label htmlFor={category.slug} className="cursor-pointer">{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={20000}
            step={100}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Shop Collection</h1>
          <p className="text-muted-foreground">
            Discover our exquisite collection of ethnic wear
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>

          {/* Grid Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={gridCols === 3 ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setGridCols(3)}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={gridCols === 4 ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setGridCols(4)}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Button (Mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearch('');
                  setCategorySlug('');
                  setPriceRange([0, 20000]);
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={cn(
                "grid gap-6",
                gridCols === 3 ? "md:grid-cols-3" : "md:grid-cols-4",
                "grid-cols-2"
              )}>
                {products?.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary mb-3">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.images[0] || '/placeholder.svg'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.is_new && (
                          <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
                            New
                          </span>
                        )}
                        {product.compare_at_price && (
                          <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => handleWishlistToggle(product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isInWishlist(product.id) ? "fill-destructive text-destructive" : "text-foreground"
                          )}
                        />
                      </button>

                      {/* Quick Add */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                        <Button
                          onClick={() => addToCart(product.id, 1, product.sizes[0], product.colors[0]?.name)}
                          className="w-full"
                          size="sm"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <p className="text-xs text-muted-foreground mb-1">{product.category?.name}</p>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                        {product.compare_at_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.compare_at_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
