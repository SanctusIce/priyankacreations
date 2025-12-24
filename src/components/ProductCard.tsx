import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  image,
  name,
  price,
  originalPrice,
  category,
  isNew,
  isSale,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-teal text-cream text-xs font-medium rounded">
              New
            </span>
          )}
          {isSale && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform duration-200"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-primary text-primary" : "text-foreground/60"}
          />
        </button>

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button variant="gold" className="w-full gap-2">
            <ShoppingBag size={16} />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {category}
        </span>
        <h3 className="font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-foreground">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
