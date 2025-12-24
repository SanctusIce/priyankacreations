import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <h3 className="text-2xl font-heading font-bold text-background mb-4">Vastra</h3>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6 font-body">
              Celebrating the timeless beauty of Indian ethnic wear. 
              Handcrafted with love, designed for the modern woman.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-background font-body">Shop</h4>
            <ul className="space-y-3 text-sm font-body">
              <li><Link to="/shop?sort=newest" className="text-background/70 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=ethnic" className="text-background/70 hover:text-primary transition-colors">Ethnic Wear</Link></li>
              <li><Link to="/shop?category=western" className="text-background/70 hover:text-primary transition-colors">Western Wear</Link></li>
              <li><Link to="/shop?category=festive" className="text-background/70 hover:text-primary transition-colors">Festive Collection</Link></li>
              <li><Link to="/sale" className="text-background/70 hover:text-primary transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-background font-body">Help</h4>
            <ul className="space-y-3 text-sm font-body">
              <li><Link to="/contact" className="text-background/70 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-background/70 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="text-background/70 hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-background/70 hover:text-primary transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/size-guide" className="text-background/70 hover:text-primary transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-background font-body">Contact</h4>
            <ul className="space-y-4 text-sm font-body">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-background/70">123 Fashion Street, Mumbai, MH 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+919876543210" className="text-background/70 hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:hello@vastra.com" className="text-background/70 hover:text-primary transition-colors">hello@vastra.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60 font-body">
          <p>© 2025 Vastra. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
