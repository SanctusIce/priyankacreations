import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-heading mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              We'd love to hear from you. Get in touch with us for any questions, feedback, or assistance.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card p-6 lg:p-8 rounded-lg shadow-card">
                <h2 className="text-2xl font-bold text-foreground font-heading mb-6">
                  Send us a message
                </h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 font-body">
                        Full Name
                      </label>
                      <Input placeholder="Your name" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 font-body">
                        Email
                      </label>
                      <Input type="email" placeholder="your@email.com" className="h-12" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 font-body">
                      Phone (Optional)
                    </label>
                    <Input type="tel" placeholder="+91 98765 43210" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 font-body">
                      Subject
                    </label>
                    <Input placeholder="How can we help you?" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 font-body">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Write your message here..." 
                      className="min-h-[150px] resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-12">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-6">
                    Get in touch
                  </h2>
                  <p className="text-muted-foreground font-body mb-8">
                    Have questions about your order, sizing, or our products? Our customer support team 
                    is here to help you with anything you need.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-body mb-1">Visit Us</h3>
                      <p className="text-muted-foreground font-body">
                        123 Fashion Street<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-body mb-1">Call Us</h3>
                      <p className="text-muted-foreground font-body">
                        <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                          +91 98765 43210
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-body mb-1">Email Us</h3>
                      <p className="text-muted-foreground font-body">
                        <a href="mailto:hello@vastra.com" className="hover:text-primary transition-colors">
                          hello@vastra.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-body mb-1">Working Hours</h3>
                      <p className="text-muted-foreground font-body">
                        Monday - Saturday: 10:00 AM - 8:00 PM<br />
                        Sunday: 11:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
