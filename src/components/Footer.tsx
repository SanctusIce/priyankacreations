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
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Celebrating the timeless beauty of Indian ethnic wear. 
              Handcrafted with love, designed for the modern woman.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-background">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop?sort=newest" className="text-background/70 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=kurtis" className="text-background/70 hover:text-primary transition-colors">Kurtis</Link></li>
              <li><Link to="/shop?category=ethnic" className="text-background/70 hover:text-primary transition-colors">Ethnic Wear</Link></li>
              <li><Link to="/shop?category=western" className="text-background/70 hover:text-primary transition-colors">Western Wear</Link></li>
              <li><Link to="/sale" className="text-background/70 hover:text-primary transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-background">Help</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Returns & Exchange</a></li>
              <li><a href="#" className="text-background/70 hover:text-primary transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4 text-background">Contact</h4>
            <ul className="space-y-4 text-sm">
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
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>© 2025 Vastra. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
