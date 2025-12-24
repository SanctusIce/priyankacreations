import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive an email with tracking information. You can also track your order by logging into your account and visiting the 'My Orders' section."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 15-day easy return policy for all products. Items must be unused, unwashed, and in their original packaging with all tags attached. Please visit our Returns & Exchange page for more details."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 5-7 business days across India. Express delivery (2-3 business days) is available for select pin codes. Delivery times may vary during festive seasons and sales."
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free standard shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 applies."
  },
  {
    question: "How do I find my correct size?",
    answer: "Please refer to our detailed Size Guide page which includes measurements for all our products. If you're between sizes, we recommend going for the larger size for a comfortable fit."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, Net Banking, and popular wallets like Paytm and PhonePe. We also offer Cash on Delivery (COD) for orders up to ₹10,000."
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "You can modify or cancel your order within 2 hours of placing it. After that, the order goes into processing and cannot be changed. Please contact our customer support for assistance."
  },
  {
    question: "Are your products authentic?",
    answer: "Yes, all products on Vastra are 100% authentic. We source directly from manufacturers and trusted suppliers to ensure quality and authenticity."
  },
  {
    question: "How do I care for my ethnic wear?",
    answer: "Each product comes with specific care instructions on the label. Generally, we recommend dry cleaning for embroidered and embellished items, and gentle machine wash for cotton kurtis."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within India. We're working on expanding our services internationally and will update our customers when this becomes available."
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-heading mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Find answers to common questions about orders, shipping, returns, and more.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline font-body py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center p-8 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-bold text-foreground font-heading mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground font-body mb-4">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center h-11 px-6 font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
