import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RotateCcw, Check, X, AlertCircle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-heading mb-4">
              Returns & Exchange
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Easy returns and exchanges within 15 days of delivery.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Quick Info */}
            <div className="bg-card p-6 lg:p-8 rounded-lg border border-border mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <RotateCcw className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground font-heading">15-Day Easy Returns</h2>
                  <p className="text-muted-foreground font-body">Hassle-free returns for all eligible products</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <p className="font-bold text-foreground font-heading text-2xl">15</p>
                  <p className="text-sm text-muted-foreground font-body">Days Return Window</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <p className="font-bold text-foreground font-heading text-2xl">Free</p>
                  <p className="text-sm text-muted-foreground font-body">Pickup Service</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <p className="font-bold text-foreground font-heading text-2xl">5-7</p>
                  <p className="text-sm text-muted-foreground font-body">Days Refund</p>
                </div>
              </div>
            </div>

            {/* Return Eligibility */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  Eligible for Return
                </h2>
                <div className="bg-success/10 border border-success/20 rounded-lg p-6">
                  <ul className="space-y-3">
                    {[
                      "Product received is damaged or defective",
                      "Wrong product or size delivered",
                      "Product doesn't match the description",
                      "Quality issues with the product",
                      "Size doesn't fit (exchange available)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-foreground font-body">
                        <Check className="text-success shrink-0" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  Not Eligible for Return
                </h2>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                  <ul className="space-y-3">
                    {[
                      "Product has been used, washed, or altered",
                      "Original tags and packaging removed",
                      "Return request raised after 15 days",
                      "Innerwear and personal care items",
                      "Products marked as non-returnable"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-foreground font-body">
                        <X className="text-destructive shrink-0" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  How to Return
                </h2>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Initiate Return", desc: "Login to your account, go to 'My Orders', and select the item you wish to return." },
                    { step: 2, title: "Select Reason", desc: "Choose the reason for return and upload images if required." },
                    { step: 3, title: "Schedule Pickup", desc: "Our pickup partner will collect the package from your doorstep." },
                    { step: 4, title: "Quality Check", desc: "Once received, we'll verify the product condition within 2-3 days." },
                    { step: 5, title: "Refund/Exchange", desc: "Refund will be processed to your original payment method within 5-7 business days." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground font-body">{item.title}</h3>
                        <p className="text-muted-foreground font-body text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground font-heading mb-4">
                  Refund Policy
                </h2>
                <div className="bg-secondary/50 p-6 rounded-lg space-y-4 font-body text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Prepaid Orders:</strong> Refund will be credited to your original payment method 
                    (Credit/Debit Card, UPI, Net Banking) within 5-7 business days after quality check.
                  </p>
                  <p>
                    <strong className="text-foreground">COD Orders:</strong> Refund will be processed via bank transfer. Please ensure 
                    your bank details are updated in your account.
                  </p>
                  <div className="flex items-start gap-3 mt-4 p-4 bg-warning/10 rounded-lg">
                    <AlertCircle className="text-warning shrink-0 mt-0.5" size={18} />
                    <p className="text-sm">
                      Shipping charges are non-refundable unless the return is due to a damaged or wrong product.
                    </p>
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

export default Returns;
