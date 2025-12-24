import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-heading mb-4">
              Shipping Information
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Everything you need to know about our shipping policies and delivery times.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Shipping Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground font-heading mb-2">Standard Delivery</h3>
                <p className="text-muted-foreground font-body mb-2">5-7 Business Days</p>
                <p className="text-sm text-muted-foreground font-body">
                  Free on orders above ₹999<br />
                  ₹99 for orders below ₹999
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground font-heading mb-2">Express Delivery</h3>
                <p className="text-muted-foreground font-body mb-2">2-3 Business Days</p>
                <p className="text-sm text-muted-foreground font-body">
                  ₹199 flat rate<br />
                  Available for select pin codes
                </p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  Shipping Policy
                </h2>
                <div className="prose prose-muted max-w-none font-body text-muted-foreground space-y-4">
                  <p>
                    At Vastra, we strive to deliver your orders as quickly and safely as possible. 
                    All orders are processed within 1-2 business days (excluding weekends and holidays).
                  </p>
                  <p>
                    Once your order has been shipped, you will receive a confirmation email with 
                    tracking information. You can track your package using the provided tracking number.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  Delivery Coverage
                </h2>
                <div className="prose prose-muted max-w-none font-body text-muted-foreground space-y-4">
                  <p>
                    We currently deliver to all major cities and towns across India. Our delivery 
                    partners include BlueDart, Delhivery, and DTDC for reliable and timely deliveries.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Metro cities: Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad</li>
                    <li>Tier 2 cities: 3-5 business days</li>
                    <li>Remote areas: 7-10 business days</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  Order Tracking
                </h2>
                <div className="prose prose-muted max-w-none font-body text-muted-foreground space-y-4">
                  <p>
                    Once your order is dispatched, you will receive an SMS and email with:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Tracking number</li>
                    <li>Courier partner details</li>
                    <li>Estimated delivery date</li>
                    <li>Link to track your package</li>
                  </ul>
                  <p>
                    You can also track your order by logging into your account and visiting the 
                    "My Orders" section.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  Important Notes
                </h2>
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <ul className="space-y-3 text-muted-foreground font-body">
                    <li className="flex items-start gap-3">
                      <Package className="text-primary shrink-0 mt-0.5" size={18} />
                      <span>Delivery times may vary during festive seasons, sales, and unforeseen circumstances.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                      <span>Please ensure your shipping address and phone number are accurate to avoid delivery delays.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="text-primary shrink-0 mt-0.5" size={18} />
                      <span>Orders placed after 2 PM will be processed the next business day.</span>
                    </li>
                  </ul>
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

export default Shipping;
