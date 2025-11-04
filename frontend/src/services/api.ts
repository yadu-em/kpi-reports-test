import axios, { AxiosInstance, AxiosError } from 'axios';
import type { ApiResponse, ApiError } from '@/types';

class ApiService {
  private client: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:8000') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: error.message || 'An unexpected error occurred',
          status: error.response?.status,
          error: error.response?.data as string,
        };
        return Promise.reject(apiError);
      }
    );
  }

  async get<T = unknown>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url);
      return {
        data: response.data,
        message: 'Success',
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  async post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data);
      return {
        data: response.data,
        message: 'Success',
      };
    } catch (error) {
      throw error as ApiError;
    }
  }
}

export const apiService = new ApiService();
export default apiService;

