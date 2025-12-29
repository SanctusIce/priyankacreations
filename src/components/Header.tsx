import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Heart, User, Menu, X, Search, LogOut, Package } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import SearchSuggestions from "@/components/SearchSuggestions";

const navLinks = [
  { name: "Ethnic", href: "/ethnic-wear" },
  { name: "Western", href: "/western-wear" },
  { name: "Festive", href: "/shop?category=festive" },
  { name: "Sale", href: "/sale", highlight: true },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      {/* Main header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm tracking-wide transition-colors link-underline ${
                    link.highlight 
                      ? "text-primary font-medium" 
                      : "text-foreground hover:text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Logo - Center */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-lg lg:text-xl font-medium text-foreground tracking-tight">
                VASTRA
              </h1>
            </Link>

            {/* Actions - Right */}
            <div className="flex items-center gap-1">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden lg:flex">
                <div className="relative">
                  <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-40 h-9 text-sm bg-transparent border-0 border-b border-border rounded-none focus:ring-0 focus:border-foreground px-0 placeholder:text-muted-foreground"
                  />
                  <SearchSuggestions
                    query={searchQuery}
                    isOpen={showSuggestions}
                    onClose={() => setShowSuggestions(false)}
                    onSelect={() => setSearchQuery('')}
                  />
                </div>
              </form>

              {/* Mobile Search Toggle */}
              <button 
                onClick={() => setIsMobileSearchOpen(true)} 
                className="lg:hidden p-2"
                aria-label="Open search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 text-foreground hover:text-muted-foreground transition-colors">
                      <User size={20} strokeWidth={1.5} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-none border-border">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild className="rounded-none">
                      <Link to="/orders" className="cursor-pointer text-sm">
                        <Package size={16} className="mr-2" strokeWidth={1.5} />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-none">
                      <Link to="/wishlist" className="cursor-pointer text-sm">
                        <Heart size={16} className="mr-2" strokeWidth={1.5} />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-sm rounded-none">
                      <LogOut size={16} className="mr-2" strokeWidth={1.5} />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  to="/auth"
                  className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}

              {/* Wishlist */}
              <Link 
                to={user ? "/wishlist" : "/auth"}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors relative"
              >
                <Heart size={20} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link 
                to="/cart"
                className="p-2 text-foreground hover:text-muted-foreground transition-colors relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
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
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg tracking-wide ${
                    link.highlight ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              {!user ? (
                <Link
                  to="/auth"
                  className="text-lg text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
              ) : (
                <>
                  <Link
                    to="/orders"
                    className="text-lg text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-lg text-foreground text-left"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Search Modal */}
      <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
        <DialogContent className="sm:max-w-md top-20 translate-y-0 rounded-none border-border">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="bg-transparent border-0 border-b border-border rounded-none h-12 text-base px-0 focus:ring-0 focus:border-foreground"
                autoFocus
              />
              <SearchSuggestions
                query={searchQuery}
                isOpen={showSuggestions}
                onClose={() => setShowSuggestions(false)}
                onSelect={() => {
                  setSearchQuery('');
                  setIsMobileSearchOpen(false);
                }}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
