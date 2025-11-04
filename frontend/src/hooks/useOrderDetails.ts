import { useEffect, useState, useCallback } from 'react';
import type { OrderDetailsResponse, ApiError } from '@/types';
import { orderDetailsService } from '@/services/orderDetailsService';

interface UseOrderDetailsParams {
  fromDate?: string;
  toDate?: string;
  page?: number;
  perPage?: number;
}

interface UseOrderDetailsReturn {
  data: OrderDetailsResponse | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  updateFilters: (params: UseOrderDetailsParams) => void;
}

export const useOrderDetails = (initialParams?: UseOrderDetailsParams): UseOrderDetailsReturn => {
  const [data, setData] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [params, setParams] = useState<UseOrderDetailsParams>(initialParams || {});

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const result = await orderDetailsService.getOrderDetails(params);
      setData(result);
    } catch (err) {
      setError(err as ApiError);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateFilters = useCallback((newParams: UseOrderDetailsParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 })); // Reset to page 1 on filter change
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateFilters,
  };
};

