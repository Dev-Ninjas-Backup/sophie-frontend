import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL } from "@/lib/baseUrl";
import type { Category } from "./useGetCategories";


interface UseGetSingleCategoryReturn {
  category: Category | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useSingleGetCategory = (categoryId: string | null): UseGetSingleCategoryReturn => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = async () => {
    if (!categoryId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/categories/${categoryId}`);
      if (response.data.success) {
        setCategory(response.data.data);
      } else {
        setError("Failed to fetch category");
        toast.error("Failed to fetch category");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [categoryId]);

  return { category, loading, error, refetch: fetchCategory };
};

export default useSingleGetCategory;
