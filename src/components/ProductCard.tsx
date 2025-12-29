import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isWishlisted = id ? isInWishlist(id) : false;

  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!id) return;
    
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

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
            "w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102 product-image",
            !imageLoaded && "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Wishlist button */}
        <button
          onClick={handleWishlistClick}
          className="wishlist-btn opacity-0 group-hover:opacity-100"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            className={cn(
              "transition-colors",
              isWishlisted ? "fill-foreground text-foreground" : "text-foreground"
            )}
          />
        </button>

        {/* Sale badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-1 uppercase tracking-wide">
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-3 space-y-1">
        {/* Product name */}
        <p className="text-xs text-foreground line-clamp-1">{name}</p>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">₹{price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-muted-foreground line-through">₹{originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );

  if (id) {
    return <Link to={`/product/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default ProductCard;
