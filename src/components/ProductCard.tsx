import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id?: string;
  image: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  category?: string;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  ratingCount?: number;
}

const ProductCard = ({
  id,
  image,
  name,
  brand = "VASTRA",
  price,
  originalPrice,
  category,
  isNew,
  isSale,
  rating = 4.2,
  ratingCount = 128,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  const cardContent = (
    <div className="product-card group cursor-pointer">
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105",
            !imageLoaded && "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="wishlist-btn"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors",
              isWishlisted ? "fill-primary text-primary" : "text-muted-foreground"
            )}
          />
        </button>

        {/* Rating badge */}
        {rating && (
          <div className="absolute bottom-2 left-2 rating-badge">
            <span>{rating.toFixed(1)}</span>
            <Star size={10} className="fill-current" />
            <span className="opacity-75">| {ratingCount >= 1000 ? `${(ratingCount/1000).toFixed(1)}k` : ratingCount}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-1">
        {/* Brand */}
        <h3 className="brand-name">{brand}</h3>
        
        {/* Product name */}
        <p className="product-name">{name}</p>
        
        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="price-current">Rs. {price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="price-original">Rs. {originalPrice.toLocaleString()}</span>
              <span className="discount-badge">({discount}% OFF)</span>
            </>
          )}
        </div>

        {/* New tag */}
        {isNew && (
          <p className="text-xs text-myntra-orange font-semibold mt-1">NEW ARRIVAL</p>
        )}
      </div>
    </div>
  );

  if (id) {
    return <Link to={`/product/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default ProductCard;
