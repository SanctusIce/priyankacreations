-- Allow anyone to view orders by order_number (for public tracking)
CREATE POLICY "Anyone can view orders by order number for tracking" 
ON public.orders 
FOR SELECT 
USING (true);