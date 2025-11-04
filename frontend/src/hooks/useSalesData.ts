import { useEffect, useState } from 'react';
import type { SalesData } from '@/types';
import { salesService } from '@/services/salesService';
import type { ApiError } from '@/types';

interface UseSalesDataReturn {
  data: SalesData | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

interface UseSalesDataOptions {
  enabled?: boolean;
}

export const useSalesData = (options: UseSalesDataOptions = { enabled: true }): UseSalesDataReturn => {
  const [data, setData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = async (): Promise<void> => {
    if (!options.enabled) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const salesData = await salesService.getSalesData();
      setData(salesData);
    } catch (err) {
      setError(err as ApiError);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

