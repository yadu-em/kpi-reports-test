import { apiService } from '@/services/api';
import type { OrderDetailsResponse } from '@/types';

interface GetOrderDetailsParams {
  fromDate?: string;
  toDate?: string;
  page?: number;
  perPage?: number;
}

export const orderDetailsService = {
  async getOrderDetails(params: GetOrderDetailsParams = {}): Promise<OrderDetailsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.fromDate) queryParams.append('from_date', params.fromDate);
    if (params.toDate) queryParams.append('to_date', params.toDate);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.perPage) queryParams.append('per_page', params.perPage.toString());
    
    const queryString = queryParams.toString();
    const url = `/order-details${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiService.get<OrderDetailsResponse>(url);
    return response.data;
  },
};

