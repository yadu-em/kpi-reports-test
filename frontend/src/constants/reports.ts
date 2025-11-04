import type { Report } from '@/types';

export const REPORTS: Report[] = [
  { id: 'order-details', name: 'Order Details', path: '/order-details' },
];

export const REPORT_NAMES: Record<string, string> = {
  'order-details': 'Order Details',
};

export const DEFAULT_REPORT_ID = REPORTS[0]?.id || 'order-details';

