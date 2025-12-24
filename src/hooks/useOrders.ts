import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface OrderItem {
  id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  size: string | null;
  color: string | null;
  unit_price: number;
  total_price: number;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  shipping_address: ShippingAddress;
  payment_status: string;
  payment_method: string | null;
  coupon_code: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

export const useOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(order => ({
        ...order,
        shipping_address: order.shipping_address as unknown as ShippingAddress,
      })) as Order[];
    },
    enabled: !!user,
  });
};

export const useOrder = (orderId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*)
        `)
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        shipping_address: data.shipping_address as unknown as ShippingAddress,
      } as Order;
    },
    enabled: !!user && !!orderId,
  });
};

interface CreateOrderInput {
  subtotal: number;
  discount_amount?: number;
  shipping_cost?: number;
  total: number;
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  payment_method?: string;
  coupon_code?: string;
  items: {
    product_id: string;
    product_name: string;
    product_image?: string;
    quantity: number;
    size?: string;
    color?: string;
    unit_price: number;
    total_price: number;
  }[];
}

export const useCreateOrder = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      if (!user) throw new Error('Not authenticated');

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          order_number: 'TMP-' + Date.now(), // Will be overwritten by trigger
          subtotal: input.subtotal,
          discount_amount: input.discount_amount || 0,
          shipping_cost: input.shipping_cost || 0,
          total: input.total,
          shipping_address: input.shipping_address as unknown as Record<string, unknown>,
          billing_address: input.billing_address as unknown as Record<string, unknown>,
          payment_method: input.payment_method,
          coupon_code: input.coupon_code,
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = input.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        unit_price: item.unit_price,
        total_price: item.total_price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
