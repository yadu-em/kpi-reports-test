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

export interface OrderDetailItem {
  jobNumber: string | null;
  soNumber: string | null;
  soLineNumber: string | null;
  drawingTag: string | null;
  jobQty: number | null;
  jobStatus: string | null;
}

export interface OrderDetailsResponse {
  items: OrderDetailItem[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

