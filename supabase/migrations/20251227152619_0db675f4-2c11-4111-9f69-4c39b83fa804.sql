-- Create promotions table for dynamic promo strip
CREATE TABLE public.promotions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'percent',
  text TEXT NOT NULL,
  link TEXT NOT NULL DEFAULT '/shop',
  color TEXT NOT NULL DEFAULT 'text-primary-foreground',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active promotions
CREATE POLICY "Anyone can view active promotions"
ON public.promotions
FOR SELECT
USING (is_active = true);

-- Only admins can manage promotions
CREATE POLICY "Admins can manage promotions"
ON public.promotions
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Insert default promotions
INSERT INTO public.promotions (icon, text, link, color, sort_order) VALUES
  ('percent', 'MEGA SALE: Up to 50% OFF', '/sale', 'text-accent', 1),
  ('gift', 'Use code WELCOME15 for 15% off first order', '/shop', 'text-primary-foreground', 2),
  ('truck', 'FREE Shipping on orders above ₹999', '/shop', 'text-primary-foreground', 3),
  ('sparkles', 'New Arrivals: Festival Collection', '/shop?filter=new', 'text-accent', 4);

-- Create trigger for updated_at
CREATE TRIGGER update_promotions_updated_at
BEFORE UPDATE ON public.promotions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();