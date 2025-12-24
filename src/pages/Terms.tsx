import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-heading mb-4">
              Terms of Service
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
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Agreement to Terms</h2>
                  <p>
                    By accessing or using the Vastra website and services, you agree to be bound by these 
                    Terms of Service. If you do not agree with any part of these terms, you may not access 
                    our website or use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Use of Our Services</h2>
                  <p className="mb-4">When using our services, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information when creating an account or placing orders</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not engage in any activity that disrupts or interferes with our services</li>
                    <li>Not attempt to gain unauthorized access to any part of our systems</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Products and Orders</h2>
                  <p className="mb-4">Regarding our products and ordering process:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All product descriptions and images are for illustrative purposes; actual products may vary slightly</li>
                    <li>Prices are subject to change without notice</li>
                    <li>We reserve the right to refuse or cancel orders at our discretion</li>
                    <li>Orders are subject to product availability</li>
                    <li>Colors may appear differently due to screen settings</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Pricing and Payment</h2>
                  <p>
                    All prices are displayed in Indian Rupees (₹) and include applicable taxes. We accept 
                    various payment methods including credit/debit cards, UPI, net banking, and cash on delivery 
                    for eligible orders. Payment must be received in full before order dispatch.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Intellectual Property</h2>
                  <p>
                    All content on our website, including text, graphics, logos, images, and software, is the 
                    property of Vastra and is protected by intellectual property laws. You may not reproduce, 
                    distribute, or use any content without our prior written consent.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">User Content</h2>
                  <p>
                    By submitting reviews, comments, or other content to our website, you grant us a 
                    non-exclusive, royalty-free license to use, modify, and display such content. You 
                    are responsible for ensuring your content does not violate any third-party rights 
                    or applicable laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, Vastra shall not be liable for any indirect, 
                    incidental, special, or consequential damages arising from your use of our services 
                    or products. Our total liability shall not exceed the amount paid by you for the 
                    specific product or service in question.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Indemnification</h2>
                  <p>
                    You agree to indemnify and hold harmless Vastra, its officers, directors, employees, 
                    and agents from any claims, damages, losses, or expenses arising from your violation 
                    of these terms or your use of our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Governing Law</h2>
                  <p>
                    These Terms of Service shall be governed by and construed in accordance with the 
                    laws of India. Any disputes arising from these terms shall be subject to the 
                    exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting to our website. Your continued use of our services after 
                    any changes constitutes acceptance of the modified terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground font-heading mb-4">Contact Information</h2>
                  <p>
                    For questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="mt-4">
                    <strong className="text-foreground">Email:</strong> legal@vastra.com<br />
                    <strong className="text-foreground">Address:</strong> 123 Fashion Street, Mumbai, MH 400001
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

export default Terms;
