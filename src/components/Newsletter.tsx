import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-newsletter-welcome', {
        body: { email: validation.data }
      });
      
      if (error) throw error;
      
      setEmail("");
      toast.success("Welcome to Vastra! Check your inbox for a special discount 🎉");
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 lg:py-14 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-lg lg:text-xl font-bold text-primary-foreground mb-2">
            Subscribe to get exclusive offers, new arrivals & insider-only discounts
          </h2>
          <p className="text-sm text-primary-foreground/70 mb-6">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 flex-1 rounded-sm"
              required
            />
            <Button 
              type="submit" 
              variant="outline"
              size="lg"
              className="h-11 px-6 font-semibold bg-background text-foreground hover:bg-background/90 border-0 rounded-sm"
              disabled={loading}
            >
              {loading ? "..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
