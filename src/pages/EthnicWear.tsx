import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, ChevronDown, ChevronUp, Grid3X3, LayoutGrid, Loader2, Heart, X } from 'lucide-react';
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

import kurti1 from "@/assets/kurti-1.jpg";
import kurti2 from "@/assets/kurti-2.jpg";
import kurti3 from "@/assets/kurti-3.jpg";
import kurti4 from "@/assets/kurti-4.jpg";
import kurti5 from "@/assets/kurti-5.jpg";
import kurti6 from "@/assets/kurti-6.jpg";
import kurti7 from "@/assets/kurti-7.jpg";
import kurti8 from "@/assets/kurti-8.jpg";

const fallbackImages = [kurti1, kurti2, kurti3, kurti4, kurti5, kurti6, kurti7, kurti8];

const EthnicWear = () => {
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name'>('newest');
  const [priceRange, setPriceRange] = useState<string>('');
  const [gridCols, setGridCols] = useState<3 | 4 | 5>(4);
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
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
    categorySlug: 'ethnic',
    sortBy,
    minPrice: selectedPriceRange?.min || 0,
    maxPrice: selectedPriceRange?.max || 100000,
  });

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

  const activeFiltersCount = [priceRange].filter(Boolean).length;

  const clearAllFilters = () => {
    setPriceRange('');
  };

  const getProductImage = (product: any, index: number) => {
    if (product.images && product.images[0] && product.images[0] !== '/placeholder.svg') {
      return product.images[0];
    }
    return fallbackImages[index % fallbackImages.length];
  };

  const FilterSection = ({ title, filterKey, children }: { title: string; filterKey: string; children: React.ReactNode }) => (
    <Collapsible open={openFilters[filterKey]} onOpenChange={() => toggleFilter(filterKey)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b border-border">
        <span className="text-sm font-bold uppercase tracking-wide font-body">{title}</span>
        {openFilters[filterKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  const FilterSidebar = () => (
    <div className="space-y-0">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <span className="text-sm font-bold uppercase tracking-wide font-body">Filters</span>
        {activeFiltersCount > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-primary font-semibold hover:underline font-body"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      <FilterSection title="Price" filterKey="price">
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label key={range.label} className="filter-item">
              <Checkbox
                checked={priceRange === range.label}
                onCheckedChange={() => setPriceRange(priceRange === range.label ? '' : range.label)}
              />
              <span className="font-body">{range.label}</span>
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
        {/* Hero Banner */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-amber-800 to-orange-700 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2">Ethnic Wear</h1>
              <p className="text-lg md:text-xl opacity-90 font-body">Traditional elegance for every occasion</p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm font-body">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Ethnic Wear</span>
            </nav>
          </div>
        </div>

        {/* Results Header */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground font-heading">
                  Ethnic Collection
                  <span className="text-muted-foreground font-normal ml-2 font-body">
                    - {products?.length || 0} items
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
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
                      <SheetTitle className="font-heading">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline font-body">Sort by:</span>
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

            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {priceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm rounded-full font-body">
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
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-background p-4 rounded-lg">
                <FilterSidebar />
              </div>
            </aside>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : products?.length === 0 ? (
                <div className="text-center py-20 bg-background rounded-lg">
                  <p className="text-muted-foreground text-lg mb-4 font-body">No ethnic wear products found</p>
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
                  {products?.map((product, index) => {
                    const discount = product.compare_at_price
                      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                      : 0;

                    const productImage = getProductImage(product, index);

                    return (
                      <div key={product.id} className="product-card group bg-background">
                        <Link to={`/product/${product.id}`}>
                          <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                            <img
                              src={productImage}
                              alt={product.name}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />

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

                            {discount > 0 && (
                              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded font-body">
                                {discount}% OFF
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="p-3 space-y-1">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="brand-name">{product.category?.name || 'VASTRA'}</h3>
                            <p className="product-name">{product.name}</p>
                          </Link>
                          
                          <div className="flex items-center gap-2 flex-wrap pt-1">
                            <span className="price-current">₹{product.price.toLocaleString()}</span>
                            {product.compare_at_price && (
                              <span className="price-original">₹{product.compare_at_price.toLocaleString()}</span>
                            )}
                          </div>
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

export default EthnicWear;
