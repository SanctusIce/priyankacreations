import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

const navLinks = [
  { name: "Ethnic Wear", href: "/shop?category=ethnic" },
  { name: "Western Wear", href: "/shop?category=western" },
  { name: "Festive", href: "/shop?category=festive" },
  { name: "Sale", href: "/sale", badge: "✨" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar - Promotional */}
        <div className="hidden lg:flex items-center justify-center py-2 text-sm bg-primary text-primary-foreground -mx-4 px-4">
          <span className="font-medium">Free Shipping on orders above ₹999 | Use code FIRST15 for 15% off</span>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between h-16 lg:h-[70px] gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight font-heading">
              Vastra
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative px-4 py-6 text-sm font-semibold text-foreground hover:text-primary transition-colors group"
              >
                <span className="flex items-center gap-1">
                  {link.name}
                  {link.badge && (
                    <span className="text-xs">{link.badge}</span>
                  )}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for ethnic wear, western wear, dresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 bg-secondary border-none h-11 text-sm rounded-full w-full"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Mobile Search Toggle */}
            <Link to="/shop" className="lg:hidden p-2">
              <Search size={22} />
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden lg:flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-3 py-2">
                    <User size={22} />
                    <span className="text-[10px] font-semibold flex items-center gap-0.5">
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
                <User size={22} />
                <span className="text-[10px] font-semibold">Login</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link 
              to={user ? "/wishlist" : "/auth"}
              className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-2 lg:px-3 py-2 relative"
            >
              <Heart size={22} />
              <span className="hidden lg:block text-[10px] font-semibold">Wishlist</span>
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
              <ShoppingBag size={22} />
              <span className="hidden lg:block text-[10px] font-semibold">Bag</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 lg:right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-none h-10 text-sm"
                />
              </div>
            </form>

            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center justify-between py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.badge && <span className="text-xs">{link.badge}</span>}
                  </span>
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
                    className="py-3 text-sm font-semibold text-foreground hover:text-primary border-b border-border"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="py-3 text-sm font-semibold text-destructive text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
