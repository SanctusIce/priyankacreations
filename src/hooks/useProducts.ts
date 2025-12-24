import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category_id: string | null;
  price: number;
  compare_at_price: number | null;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock_quantity: number;
  sku: string | null;
  is_featured: boolean;
  is_new: boolean;
  is_active: boolean;
  created_at: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

export const useProducts = (filters?: {
  categorySlug?: string;
  featured?: boolean;
  isNew?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'name';
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug)
        `)
        .eq('is_active', true);

      if (filters?.categorySlug) {
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', filters.categorySlug)
          .single();
        
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      if (filters?.isNew) {
        query = query.eq('is_new', true);
      }

      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }

      switch (filters?.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return (data || []).map(product => ({
        ...product,
        colors: Array.isArray(product.colors) 
          ? product.colors as { name: string; hex: string }[]
          : JSON.parse(product.colors as string || '[]'),
      })) as Product[];
    },
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug)
        `)
        .eq('id', productId)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        colors: Array.isArray(data.colors) 
          ? data.colors as { name: string; hex: string }[]
          : JSON.parse(data.colors as string || '[]'),
      } as Product;
    },
    enabled: !!productId,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data as Category[];
    },
  });
};
