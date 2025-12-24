import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-heading mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Last updated: January 2025
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-muted-foreground font-body">
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Introduction</h2>
                  <p>
                    At Vastra ("we", "our", or "us"), we are committed to protecting your privacy and ensuring 
                    the security of your personal information. This Privacy Policy explains how we collect, use, 
                    disclose, and safeguard your information when you visit our website or make a purchase.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Information We Collect</h2>
                  <p className="mb-4">We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Personal information (name, email address, phone number, shipping address)</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Order history and preferences</li>
                    <li>Communication preferences</li>
                    <li>Feedback and correspondence</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">How We Use Your Information</h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send promotional communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Prevent fraud and enhance security</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Information Sharing</h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share 
                    your information with trusted service providers who assist us in operating our website, 
                    processing payments, and delivering orders. These partners are bound by confidentiality 
                    agreements and are only permitted to use your information for the specific services they provide.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption 
                    for all data transmission and secure storage of sensitive information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Cookies</h2>
                  <p>
                    Our website uses cookies to enhance your browsing experience. Cookies are small files 
                    stored on your device that help us remember your preferences, understand how you use 
                    our site, and improve our services. You can choose to disable cookies through your 
                    browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and receive a copy of your personal data</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <p className="mt-4">
                    <strong className="text-foreground">Email:</strong> privacy@vastra.com<br />
                    <strong className="text-foreground">Address:</strong> 123 Fashion Street, Mumbai, MH 400001
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this 
                    page with an updated revision date. We encourage you to review this policy periodically.
                  </p>
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

export default Privacy;
