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
  { name: "Men", href: "/shop?category=men" },
  { name: "Women", href: "/shop?category=women" },
  { name: "Kids", href: "/shop?category=kids" },
  { name: "Home & Living", href: "/shop?category=home" },
  { name: "Beauty", href: "/shop?category=beauty" },
  { name: "Studio", href: "/shop", badge: "NEW" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight font-heading">
              Vastra
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative px-4 py-6 text-sm font-semibold text-foreground uppercase tracking-wide hover:text-primary transition-colors group"
              >
                <span className="flex items-center gap-1">
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded">
                      {link.badge}
                    </span>
                  )}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products, brands and more"
                className="pl-10 bg-secondary border-none h-10 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 lg:gap-6">
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden lg:flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-3 py-2">
                    <User size={20} />
                    <span className="text-xs font-semibold flex items-center gap-0.5">
                      Profile <ChevronDown size={10} />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold">Welcome</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">
                      <Package size={16} className="mr-2" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer">
                      <Heart size={16} className="mr-2" />
                      Wishlist
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
                <span className="text-xs font-semibold">Login</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link 
              to={user ? "/wishlist" : "/auth"}
              className="hidden lg:flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-3 py-2 relative"
            >
              <Heart size={20} />
              <span className="text-xs font-semibold">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart"
              className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors px-3 py-2 relative"
            >
              <ShoppingBag size={20} />
              <span className="hidden lg:block text-xs font-semibold">Bag</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t border-border animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products, brands and more"
                className="pl-10 bg-secondary border-none h-10 text-sm"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
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
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  className="py-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
              {user && (
                <>
                  <Link
                    to="/orders"
                    className="py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="py-3 text-sm font-semibold text-destructive hover:text-destructive/80 transition-colors text-left"
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
