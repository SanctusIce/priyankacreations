import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, Grid3X3, LayoutGrid, Loader2, Heart, Star, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Shop = () => {
  const [search, setSearch] = useState('');
  const [categorySlug, setCategorySlug] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name'>('newest');
  const [priceRange, setPriceRange] = useState<string>('');
  const [gridCols, setGridCols] = useState<3 | 4 | 5>(4);
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
  });

  const priceRanges = [
    { label: 'Rs. 299 to Rs. 599', min: 299, max: 599 },
    { label: 'Rs. 599 to Rs. 999', min: 599, max: 999 },
    { label: 'Rs. 999 to Rs. 1999', min: 999, max: 1999 },
    { label: 'Rs. 1999 to Rs. 2999', min: 1999, max: 2999 },
    { label: 'Rs. 2999 to Rs. 4999', min: 2999, max: 4999 },
  ];

  const selectedPriceRange = priceRanges.find(p => p.label === priceRange);

  const { data: products, isLoading } = useProducts({
    search,
    categorySlug: categorySlug || undefined,
    sortBy,
    minPrice: selectedPriceRange?.min || 0,
    maxPrice: selectedPriceRange?.max || 100000,
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

  const toggleFilter = (key: string) => {
    setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeFiltersCount = [categorySlug, priceRange].filter(Boolean).length;

  const clearAllFilters = () => {
    setCategorySlug('');
    setPriceRange('');
    setSearch('');
  };

  const FilterSection = ({ title, filterKey, children }: { title: string; filterKey: string; children: React.ReactNode }) => (
    <Collapsible open={openFilters[filterKey]} onOpenChange={() => toggleFilter(filterKey)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b border-border">
        <span className="text-sm font-bold uppercase tracking-wide">{title}</span>
        {openFilters[filterKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  const FilterSidebar = () => (
    <div className="space-y-0">
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <span className="text-sm font-bold uppercase tracking-wide">Filters</span>
        {activeFiltersCount > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-primary font-semibold hover:underline"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Categories" filterKey="categories">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          <label className="filter-item">
            <Checkbox
              checked={categorySlug === ''}
              onCheckedChange={() => setCategorySlug('')}
            />
            <span>All Products</span>
          </label>
          {categories?.map((category) => (
            <label key={category.id} className="filter-item">
              <Checkbox
                checked={categorySlug === category.slug}
                onCheckedChange={() => setCategorySlug(category.slug)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price" filterKey="price">
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label key={range.label} className="filter-item">
              <Checkbox
                checked={priceRange === range.label}
                onCheckedChange={() => setPriceRange(priceRange === range.label ? '' : range.label)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      <main className="pt-20 lg:pt-[70px]">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Shop All</span>
            </nav>
          </div>
        </div>

        {/* Results Header */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {categorySlug ? categories?.find(c => c.slug === categorySlug)?.name : 'All Products'}
                  <span className="text-muted-foreground font-normal ml-2">
                    - {products?.length || 0} items
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <span className="ml-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                    <SelectTrigger className="w-40 sm:w-48 h-9 text-sm">
                      <SelectValue placeholder="Recommended" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">What's New</SelectItem>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="price_desc">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Grid Toggle (Desktop) */}
                <div className="hidden lg:flex items-center gap-1 border border-border rounded-md p-1">
                  <Button
                    variant={gridCols === 3 ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setGridCols(3)}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridCols === 4 ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setGridCols(4)}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {categorySlug && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm rounded-full">
                    {categories?.find(c => c.slug === categorySlug)?.name}
                    <button onClick={() => setCategorySlug('')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {priceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm rounded-full">
                    {priceRange}
                    <button onClick={() => setPriceRange('')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-background p-4 rounded-lg">
                <FilterSidebar />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : products?.length === 0 ? (
                <div className="text-center py-20 bg-background rounded-lg">
                  <p className="text-muted-foreground text-lg mb-4">No products found</p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className={cn(
                  "grid gap-4",
                  gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
                  "grid-cols-2 md:grid-cols-3"
                )}>
                  {products?.map((product) => {
                    const discount = product.compare_at_price
                      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                      : 0;

                    return (
                      <div key={product.id} className="product-card group bg-background">
                        <Link to={`/product/${product.id}`}>
                          <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                            <img
                              src={product.images[0] || '/placeholder.svg'}
                              alt={product.name}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Wishlist Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleWishlistToggle(product.id);
                              }}
                              className="wishlist-btn"
                            >
                              <Heart
                                size={16}
                                className={cn(
                                  "transition-colors",
                                  isInWishlist(product.id) ? "fill-primary text-primary" : "text-muted-foreground"
                                )}
                              />
                            </button>

                            {/* Rating Badge */}
                            <div className="absolute bottom-2 left-2 rating-badge">
                              <span>4.2</span>
                              <Star size={10} className="fill-current" />
                              <span className="opacity-75">| 2.3k</span>
                            </div>
                          </div>
                        </Link>

                        <div className="p-3 space-y-1">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="brand-name">{product.category?.name || 'VASTRA'}</h3>
                            <p className="product-name">{product.name}</p>
                          </Link>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="price-current">Rs. {product.price.toLocaleString()}</span>
                            {product.compare_at_price && (
                              <>
                                <span className="price-original">Rs. {product.compare_at_price.toLocaleString()}</span>
                                <span className="discount-badge">({discount}% OFF)</span>
                              </>
                            )}
                          </div>

                          {product.is_new && (
                            <p className="text-xs text-myntra-orange font-semibold">NEW ARRIVAL</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
