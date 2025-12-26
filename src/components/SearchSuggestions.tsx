import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';

interface SearchSuggestionsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
}

const SearchSuggestions = ({ query, isOpen, onClose, onSelect }: SearchSuggestionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { data: products, isLoading } = useProducts({
    search: query,
  });

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || query.length < 2) return null;

  const suggestions = products?.slice(0, 6) || [];

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 overflow-hidden"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="divide-y divide-border">
          {suggestions.map((product) => (
            <li key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors"
                onClick={() => {
                  onSelect();
                  onClose();
                }}
              >
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-primary font-semibold">
                    ₹{product.price.toLocaleString()}
                    {product.compare_at_price && (
                      <span className="ml-2 text-xs text-muted-foreground line-through">
                        ₹{product.compare_at_price.toLocaleString()}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={`/shop?search=${encodeURIComponent(query)}`}
              className="block p-3 text-center text-sm font-medium text-primary hover:bg-secondary/50 transition-colors"
              onClick={() => {
                onSelect();
                onClose();
              }}
            >
              View all results for "{query}"
            </Link>
          </li>
        </ul>
      ) : (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No products found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
