import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Heart, User, Menu, X, Search, LogOut, Package, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchSuggestions from "@/components/SearchSuggestions";

const navLinks = [
  { name: "Ethnic Wear", href: "/ethnic-wear" },
  { name: "Western Wear", href: "/western-wear" },
  { name: "Festive", href: "/shop?category=festive" },
  { name: "Sale", href: "/sale", highlight: true },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      {/* Promo Strip */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-xs sm:text-sm font-medium">
        Free Shipping on orders above ₹999 | Use code FIRST15 for 15% off
      </div>

      {/* Main header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl lg:text-2xl font-bold text-primary tracking-tight font-heading italic">
                Vastra
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    link.highlight 
                      ? "text-primary hover:text-primary/80" 
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                  {link.highlight && <span className="ml-1">+</span>}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for ethnic wear, dresses..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-10 pr-4 bg-secondary/50 border-border h-10 text-sm rounded-md w-full"
                />
                <SearchSuggestions
                  query={searchQuery}
                  isOpen={showSuggestions}
                  onClose={() => setShowSuggestions(false)}
                  onSelect={() => setSearchQuery('')}
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-0">
              {/* Mobile Search Toggle */}
              <Link to="/shop" className="lg:hidden p-2">
                <Search size={20} />
              </Link>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden lg:flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-3 py-2">
                      <User size={20} />
                      <span className="text-[10px] font-medium flex items-center gap-0.5">
                        Profile <ChevronDown size={10} />
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold">Hello!</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="cursor-pointer">
                        <Package size={16} className="mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="cursor-pointer">
                        <Heart size={16} className="mr-2" />
                        My Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  to="/auth"
                  className="hidden lg:flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-3 py-2"
                >
                  <User size={20} />
                  <span className="text-[10px] font-medium">Login</span>
                </Link>
              )}

              {/* Wishlist */}
              <Link 
                to={user ? "/wishlist" : "/auth"}
                className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-2 lg:px-3 py-2 relative"
              >
                <Heart size={20} />
                <span className="hidden lg:block text-[10px] font-medium">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 lg:right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link 
                to="/cart"
                className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-2 lg:px-3 py-2 relative"
              >
                <ShoppingBag size={20} />
                <span className="hidden lg:block text-[10px] font-medium">Bag</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 lg:right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-10 bg-secondary/50 border-border h-10 text-sm"
                />
                <SearchSuggestions
                  query={searchQuery}
                  isOpen={showSuggestions}
                  onClose={() => setShowSuggestions(false)}
                  onSelect={() => {
                    setSearchQuery('');
                    setIsMenuOpen(false);
                  }}
                />
              </div>
            </form>

            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`py-3 text-sm font-medium border-b border-border ${
                    link.highlight ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                  {link.highlight && <span className="ml-1">+</span>}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  className="py-3 text-sm font-bold text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
              {user && (
                <>
                  <Link
                    to="/orders"
                    className="py-3 text-sm font-medium text-foreground hover:text-primary border-b border-border"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="py-3 text-sm font-medium text-destructive text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
