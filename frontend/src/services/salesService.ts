import { apiService } from '@/services/api';
import type { SalesData } from '@/types';

export const salesService = {
  async getSalesData(): Promise<SalesData> {
    const response = await apiService.get<SalesData>('/sales');
    return response.data;
  },
};

