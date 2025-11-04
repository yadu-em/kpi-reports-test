export interface Report {
  id: string;
  name: string;
  path: string;
}

export interface SalesData {
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  error?: string;
}

