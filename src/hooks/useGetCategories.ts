import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '@/lib/baseUrl';

// Types for Partner and Category
export interface Partner {
  id: string;
  name: string;
  discount: string;
  categoryId: string;
  maxRedeems: number;
}

export interface Category {
  id: string;
  name: string;
  partners: Partner[];
}

// Hook return type
interface UseGetCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useGetCategories = (): UseGetCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<{ success: boolean; message: string; data: Category[] }>(
        `${BASE_URL}/categories`
      );

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError('Failed to fetch categories');
        toast.error('Failed to fetch categories');
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};

export default useGetCategories;
