import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-cream">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-heading font-bold mb-4">Vastra</h3>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Celebrating the timeless beauty of Indian ethnic wear. 
              Handcrafted with love, designed for the modern woman.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-light">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Kurtis</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Pants & Palazzos</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Kurti Sets</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-light">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">FAQs</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Returns & Exchange</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-cream/70 hover:text-gold transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-light">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <span className="text-cream/70">123 Fashion Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <a href="tel:+919876543210" className="text-cream/70 hover:text-gold transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <a href="mailto:hello@vastra.com" className="text-cream/70 hover:text-gold transition-colors">hello@vastra.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/60">
          <p>© 2025 Vastra. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
